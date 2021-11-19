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

import { ChessGameLoop } from './ChessGameLoop.js'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';



const window = Dimensions.get("window");
const maximumWidth = Math.min(window.width, window.height)
const boardLength = 0.8 * maximumWidth
const cellSize = boardLength / 8




function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



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

  }

  async componentWillUnmount() {


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

  }

  async reset() { //Resets game to initial state

    this.setState({
      playAI: !this.state.playAI
    })

    if (this.state.AIStatus === "Off") {
      this.setState({
        AIStatus: "On"
      })
    } else {
      this.setState({
        AIStatus: "Off"
      })
    }

    await this.sleep(200)

    this.engine.swap({
      player1: { position: [this.gridWidth / 2, 0.85 * this.gridHeight], xspeed: 0.0, playerSpeed: PongConstants.PLAYER_SPEED2, isServing: false, yspeed: 0.0, gridWidth: this.gridWidth, gridHeight: this.gridHeight, width: paddleWidth, height: paddleHeight, renderer: <Paddle /> },
      player2: { position: [this.gridWidth / 2, 0.15 * this.gridHeight], xspeed: 0.0, yspeed: 0.0, isServing: false, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'black'} /> },
      ball: {
        position: [this.gridWidth / 4, 0.2 * this.gridHeight], xspeed: PongConstants.BALL_SPEED2, ballSpeed: PongConstants.BALL_SPEED2, yspeed: PongConstants.BALL_SPEED2, windowWidth: window.width, color: 'white', width: ballSize, height: ballSize, renderer: <Ball />
      },
      AI: { position: [this.gridWidth / 2, 0.15 * this.gridHeight], tick: 0, tickCount: 20, xspeed: 0.0, yspeed: 0.0, isServing: false, isPlaying: this.state.playAI, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'red'} /> },
      timer: { position: [0, 0], tick: 0, tickCount: 60, width: ballSize * 10, height: ballSize * 2, renderer: <MyTimer /> },
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

<Text style={{ zIndex: 2, color: 'black', fontSize: 40, position: 'absolute', top: '20%' }}>{this.state.selectedPiece} selected</Text>

        <GameEngine
          ref={(ref) => { this.engine = ref }}
          style={{ zIndex: 0, width: boardLength, height: boardLength, flex: null, position: 'absolute', backgroundColor: null }}
          entities={{
            board: { position: [0, 0], gridArray: [[]], lastSelected: [], lastSelected: "nothing", selectionMade: false, blacksTurn: false, selectedPiece: "nothing", length: boardLength, CELL_SIZE: cellSize, engine: this.engine, initialized: false, renderer: <Board /> },
            a2pawn: {position: [0, 6], isBlack: false, isSelected: false, isPinned: false, isAlive: true, CELL_SIZE: cellSize, renderer: <Pawn/>},
            b2pawn: {position: [1, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            c2pawn: {position: [2, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            d2pawn: {position: [3, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            e2pawn: {position: [4, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            f2pawn: {position: [5, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            g2pawn: {position: [6, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            h2pawn: {position: [7, 6], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},

            a1rook: {position: [0, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Rook/>},
            b1knight: {position: [1, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Knight/>},
            c1bishop: {position: [2, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Bishop/>},
            d1queen: {position: [3, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Queen/>},
            e1king: {position: [4, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <King/>},
            f1bishop: {position: [5, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Bishop/>},
            g1knight: {position: [6, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Knight/>},
            h1rook: {position: [7, 7], isBlack: false, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Rook/>},

            a7pawn: {position: [0, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            b7pawn: {position: [1, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            c7pawn: {position: [2, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            d7pawn: {position: [3, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            e7pawn: {position: [4, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            f7pawn: {position: [5, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            g7pawn: {position: [6, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},
            h7pawn: {position: [7, 1], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Pawn/>},

            a8rook: {position: [0, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Rook/>},
            b8knight: {position: [1, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Knight/>},
            c8bishop: {position: [2, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Bishop/>},
            d8queen: {position: [3, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Queen/>},
            e8king: {position: [4, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <King/>},
            f8bishop: {position: [5, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Bishop/>},
            g8knight: {position: [6, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Knight/>},
            h8rook: {position: [7, 0], isBlack: true, isSelected: false, isPinned: false, CELL_SIZE: cellSize, renderer: <Rook/>},


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
    backgroundColor: "white",
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

