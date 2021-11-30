import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useState } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, Image, ScrollView, SafeAreaView, View, Switch, Dimensions, Button, Alert, Pressable } from 'react-native';
import { DefaultTimer, GameEngine } from "react-native-game-engine";
import { Component } from 'react';
import Board from './Board.js'
import Pawn from './Pawn.js'
import Rook from './Rook.js'
import Knight from './Knight.js'
import Bishop from './Bishop.js'
import Queen from './Queen.js'
import King from './King.js'
import BoardArray from './BoardArray.js';
import SelectedSquare from './SelecteSquare';


import { ChessGameLoop } from './ChessGameLoop.js'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';



const window = Dimensions.get("window");
const maximumWidth = Math.min(window.width, window.height)
const boardLength = maximumWidth
const cellSize = boardLength / 8




function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const soundFiles = [
  {
    id: '001',
    sound: require('./chessSounds/movesound1.wav'),
  },
  {
    id: '002',
    sound: require('./chessSounds/movesound2.wav'),
  },
  {
    id: '003',
    sound: require('./chessSounds/movesound3.wav'),
  },
  {
    id: '004',
    sound: require('./chessSounds/movesound4.wav'),
  },
  {
    id: '005',
    sound: require('./chessSounds/kingscream.wav'),
  },
]


export default class Chess extends Component {
  constructor(props) {
    super(props);
    this.engine = null;
    this.navigation = props.navigation
    this.onSelect = this.onSelect.bind(this)

    this.state = {
      playAI: true,
      running: true,
      selectedPiece: "no piece",
    }

  }




  async componentDidMount() {
    //For setting up audio playback and loading all sound files.
    //This function should probably be in its own file eventually, to load all of the app's sounds.
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptonMode: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: false,
      playThroughEarpieceAndroid: true,
    });

    this.movesound1 = new Audio.Sound()
    this.movesound2 = new Audio.Sound()
    this.movesound3 = new Audio.Sound()
    this.movesound4 = new Audio.Sound()
    this.kingdeathsound = new Audio.Sound()



    const status = {
      shouldPlay: false,
      volume: 1,
      progressUpdateIntervalMillis: 1
    }



    try {

      await this.movesound1.loadAsync(soundFiles[0].sound, status)
      await this.movesound2.loadAsync(soundFiles[1].sound, status)
      await this.movesound3.loadAsync(soundFiles[2].sound, status)
      await this.movesound4.loadAsync(soundFiles[3].sound, status)
      await this.kingdeathsound.loadAsync(soundFiles[4].sound, status)



    } catch (error) {
      console.log("Error loading sounds")
    }

  }

  async componentWillUnmount() {
    await this.movesound1.unloadAsync()
    await this.movesound2.unloadAsync()
    await this.movesound3.unloadAsync()
    await this.movesound4.unloadAsync()
    await this.kingdeathsound.unloadAsync()



  }

  sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async playSound(sound) {
    await sound.playFromPositionAsync(0);
  }


  onEvent = (e) => { //Event handler for the <GameEngine/>
    if (e.type === "something") {
      console.log('something')
      console.log(`${e.selection[0][0]}, ${e.selection[0][1]} piece`)

    }
    else if(e.type === "selection"){
      console.log(`${e.selection[0]}, ${e.selection[1]} piece selected`)
    }
    else if(e.type === "selectionmade"){
      this.state.selectedPiece = e.selection
      this.setState({
        selectionPiece: e.selection
      })    
    }
    else if(e.type === "movemade"){
      const randomNumber = Math.floor(
        Math.random() * 101
      )

      try {
        if (randomNumber > 0 && randomNumber < 25) {
          this.playSound(this.movesound1)
        } else if (randomNumber > 25 && randomNumber < 50) {
          this.playSound(this.movesound2)
        } else if (randomNumber > 50 && randomNumber < 75) {
          this.playSound(this.movesound3)
        } else {
          this.playSound(this.movesound4)

        }
      } catch (error) {
        console.log("error playing sound")
      }
    } else if(e.type === "checkmate"){
      this.playSound(this.kingdeathsound)
      this.reset()

    }

  }

  async reset() { //Resets game to initial state

    await this.sleep(500)
    this.setState({
      selectedPiece: "no piece",
    })

    this.engine.swap({
      board:  {justMounted: true, position: [0, 0], gridArray: [[]], lastSelected: [], lastSelected: "nothing", selectionMade: false, blacksTurn: false, selectedPiece: "nothing", length: boardLength, CELL_SIZE: cellSize, engine: this.engine, initialized: false, renderer: <Board /> },
      selectedSquare: {position: [0, 100], CELL_SIZE: cellSize, renderer: <SelectedSquare/>},
      a2pawn: {piece: "a2pawn", position: [0, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      b2pawn: {piece: "b2pawn", position: [1, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      c2pawn: {piece: "c2pawn", position: [2, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      d2pawn: {piece: "d2pawn", position: [3, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      e2pawn: {piece: "e2pawn", position: [4, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      f2pawn: {piece: "f2pawn", position: [5, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      g2pawn: {piece: "g2pawn", position: [6, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
      h2pawn: {piece: "h2pawn", position: [7, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},

      a1rook: {piece: "a1rook", position: [0, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Rook/>},
      b1knight: {piece: "b1knight", position: [1, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Knight/>},
      c1bishop: {piece: "c1bishop", position: [2, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Bishop/>},
      d1queen: {piece: "d1queen", position: [3, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Queen/>},
      e1king: {piece: "e1king", position: [4, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <King/>},
      f1bishop: {piece: "f1bishop", position: [5, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
      g1knight: {piece: "g1knight", position: [6, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
      h1rook: {piece: "h1rook", position: [7, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},

      a7pawn: {piece: "a7pawn", position: [0, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      b7pawn: {piece: "b7pawn", position: [1, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      c7pawn: {piece: "c7pawn", position: [2, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      d7pawn: {piece: "d7pawn", position: [3, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      e7pawn: {piece: "e7pawn", position: [4, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      f7pawn: {piece: "f7pawn", position: [5, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      g7pawn: {piece: "g7pawn", position: [6, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
      h7pawn: {piece: "h7pawn", position: [7, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},

      a8rook: {piece: "a8rook", position: [0, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},
      b8knight: {piece: "b8knight", position: [1, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
      c8bishop: {piece: "c8bishop", position: [2, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
      d8queen: {piece: "d8queen", position: [3, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Queen/>},
      e8king: {piece: "e8king", position: [4, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <King/>},
      f8bishop: {piece: "f8bishop", position: [5, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
      g8knight: {piece: "g8knight", position: [6, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
      h8rook: {piece: "h8rook", position: [7, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},
    })
    this.setState({
      running: true,
      selectedPiece: "nothing",
      p2score: 0,
    })
  }

  




  onGoBack = () => { this.navigation.goBack() }
  onSelection = () => { this.engine.dispatch({ type: "selection", selection: [0, 0] }) }
  onReset = () => { this.reset() }
  onSelect = (i, j) => { this.engine.dispatch({ type: "selection", selection: [i, j] }) }






  render() {



    return (
      <View style={styles.container}>

        <GameEngine
          ref={(ref) => { this.engine = ref }}
          style={{ zIndex: 0, width: boardLength, height: boardLength, flex: null, position: 'absolute', backgroundColor: null }}
          entities={{
            board:  {justMounted: true, position: [0, 0], gridArray: [[]], lastSelected: [], lastSelected: "nothing", selectionMade: false, blacksTurn: false, selectedPiece: "nothing", length: boardLength, CELL_SIZE: cellSize, engine: this.engine, initialized: false, renderer: <Board /> },
            selectedSquare: {position: [0, 100], CELL_SIZE: cellSize, renderer: <SelectedSquare/>},
            a2pawn: {piece: "a2pawn", position: [0, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            b2pawn: {piece: "b2pawn", position: [1, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            c2pawn: {piece: "c2pawn", position: [2, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            d2pawn: {piece: "d2pawn", position: [3, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            e2pawn: {piece: "e2pawn", position: [4, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            f2pawn: {piece: "f2pawn", position: [5, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            g2pawn: {piece: "g2pawn", position: [6, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            h2pawn: {piece: "h2pawn", position: [7, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},

            a1rook: {piece: "a1rook", position: [0, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Rook/>},
            b1knight: {piece: "b1knight", position: [1, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Knight/>},
            c1bishop: {piece: "c1bishop", position: [2, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Bishop/>},
            d1queen: {piece: "d1queen", position: [3, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Queen/>},
            e1king: {piece: "e1king", position: [4, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <King/>},
            f1bishop: {piece: "f1bishop", position: [5, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
            g1knight: {piece: "g1knight", position: [6, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
            h1rook: {piece: "h1rook", position: [7, 7], isBlack: false, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},

            a7pawn: {piece: "a7pawn", position: [0, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            b7pawn: {piece: "b7pawn", position: [1, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            c7pawn: {piece: "c7pawn", position: [2, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            d7pawn: {piece: "d7pawn", position: [3, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            e7pawn: {piece: "e7pawn", position: [4, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            f7pawn: {piece: "f7pawn", position: [5, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            g7pawn: {piece: "g7pawn", position: [6, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},
            h7pawn: {piece: "h7pawn", position: [7, 1], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Pawn/>},

            a8rook: {piece: "a8rook", position: [0, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},
            b8knight: {piece: "b8knight", position: [1, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
            c8bishop: {piece: "c8bishop", position: [2, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
            d8queen: {piece: "d8queen", position: [3, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Queen/>},
            e8king: {piece: "e8king", position: [4, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <King/>},
            f8bishop: {piece: "f8bishop", position: [5, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Bishop/>},
            g8knight: {piece: "g8knight", position: [6, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Knight/>},
            h8rook: {piece: "h8rook", position: [7, 0], isBlack: true, isSelected: false, isPinned: false, isAlive: true,  CELL_SIZE: cellSize, renderer: <Rook/>},


          }}
          systems={[ChessGameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}

        />

<View style={{ zIndex: 1, position: 'absolute', width: window.width, flexDirection: 'row', top: '90%', justifyContent: 'space-evenly' }}>

          <Button title="Go Back" onPress={this.onGoBack} />

        </View>

        <View style={{ zIndex: 1, width: boardLength, height: boardLength, flex: null, flexDirection: "column", position: 'absolute', backgroundColor: null  }}>
          <TouchableOpacity onPress={() => this.onSelect(0, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 0)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 0 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 1)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 1 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 2)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 2 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 3)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 3 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 4)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 4 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 5)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 5 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 6)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 6 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(0, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 0 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(1, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 1 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(2, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 2 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(3, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 3 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(4, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 4 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(5, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 5 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(6, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 6 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onSelect(7, 7)}>
          <View style={{ width: cellSize, height: cellSize, position: 'absolute', left: 7 * cellSize, top: 7 * cellSize, backgroundColor: null, }} />
          </TouchableOpacity>
          
          </View>

      </View>
    )
  }
} //End of Chess class


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 0.5,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0
  },
  dividingContainer: {
    flex: 0.1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: null,
    marginHorizontal: 20,
    flex: 1
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute'

  },
  controlRow: {
    flex: 1,
    width: 300,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: null
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: '#454545',

  },
  text: {
    fontSize: 15,
    flex: 1,
    alignSelf:
      'center',
    color: 'black',
  },
  oval: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#BA180E",
    transform: [{ scaleX: 2 }],
  },
});


AppRegistry.registerComponent("ChessGame", () => Chess);

