import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useState } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, Image, ScrollView, SafeAreaView, View, Switch, Dimensions, Button, Alert, Pressable } from 'react-native';
import { DefaultTimer, GameEngine } from "react-native-game-engine";
import { Component } from 'react';
import Board from './Board.js'
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


    this.state = {
      playAI: true,
      running: true,
      p1score: 0,
      p2score: 0,
      AIStatus: "Off",
      bgMusic: true,
      soundEffects: true
    }

  }

  toggleBGMusic = () => {
    this.setState({
      bgMusic: !this.state.bgMusic
    })
  }

  toggleSoundEffects = () => {
    this.setState({
      soundEffects: !this.state.soundEffects
    })
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
      p1score: 0,
      p2score: 0,
    })
  }




  onGoBack = () => { this.navigation.goBack() }
  onSomething = () => { this.engine.dispatch({ type: "something" }) }
  onReset = () => { this.reset() }





  render() {



    return (
      <View style={styles.container}>

        <GameEngine
          ref={(ref) => { this.engine = ref }}
          style={{ zIndex: 0, width: boardLength, height: boardLength, flex: null, position: 'absolute', backgroundColor: null }}
          entities={{
            board: { position: [0, 0], gridArray: [[]], pieceArray: [[]], selectedPiece: "nothing", length: boardLength, CELL_SIZE: cellSize, boardSize: boardLength, engine: this.engine, initialized: false, renderer: <Board /> },
          }}
          systems={[ChessGameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}

        />

<View style={{ zIndex: 1, position: 'absolute', width: window.width, flexDirection: 'row', top: '90%', justifyContent: 'space-evenly' }}>

          <Pressable style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }} onPress={this.onGoBack}>
              <Text style={{ color: 'black' }}>Go Back</Text>
          </Pressable>
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

