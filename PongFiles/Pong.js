import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useState } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, Image, ScrollView, SafeAreaView, View, Switch, Dimensions, Button, Alert, Pressable } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { Component } from 'react';
import Paddle from './Paddle.js'
import Ball from './Ball.js'
import { PongGameLoop } from './PongGameLoop.js'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import PongConstants from './PongConstants.js';



const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
// const gameWidth =  0.8 * window.width
const gameHeight = 0.6*window.height
const gameWidth = gameHeight/2
// var gameHeight = gameWidth*1.75
const ballSize = gameWidth/30
const paddleWidth = ballSize * 3
const paddleHeight = ballSize

// if(gameHeight > 0.75*window.height){
//   gameHeight = gameWidth*1.5
// }





const soundFiles = [
  {
    id: '001',
    sound: require('./PongSounds/blip1.wav'),
  },
  {
    id: '002',
    sound: require('./PongSounds/blip2.wav'),
  },
  {
    id: '003',
    sound: require('./PongSounds/blip3.wav'),
  },
  {
    id: '004',
    sound: require('./PongSounds/blip4.wav'),
  },
]

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



export default class Pong extends Component {
  constructor(props) {
    super(props);
    this.gridWidth = gameWidth/ballSize
    this.gridHeight = gameHeight/ballSize
    this.lowerBound = 0
    this.arrowWidth = (2 * window.width)/9
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

    this.blipSound1 = new Audio.Sound()
    this.blipSound2 = new Audio.Sound()
    this.blipSound3 = new Audio.Sound()
    this.blipSound4 = new Audio.Sound()
    this.pauseSound = new Audio.Sound()
    this.resumeSound = new Audio.Sound()

    console.log(`${this.cellWidth} and ${this.cellHeight}`)





    const status = {
      shouldPlay: false,
      volume: 0.6,
      progressUpdateIntervalMillis: 1
    }

    const status2 = {
      shouldPlay: true,
      volume: 0.7,
      isLooping: true
    }


    try {

      await this.blipSound1.loadAsync(soundFiles[0].sound, status)
      await this.blipSound2.loadAsync(soundFiles[1].sound, status)
      await this.blipSound3.loadAsync(soundFiles[2].sound, status)
      await this.blipSound4.loadAsync(soundFiles[3].sound, status)


    } catch (error) {
      console.log("Error loading sounds")
    }

  }

  async componentWillUnmount() {
    await this.blipSound1.unloadAsync()
    await this.blipSound2.unloadAsync()
    await this.blipSound3.unloadAsync()
    await this.blipSound4.unloadAsync()

  }

  sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  onEvent = (e) => { //Event handler for the <GameEngine/>
    if (e.type === "collision") {
      console.log('collision')
      const randomNumber = randomBetween(0, 100)

      try {
        if (randomNumber > 0 && randomNumber < 25) {
          this.blipSound1.playFromPositionAsync(0)
        } else if (randomNumber > 25 && randomNumber < 50) {
          this.blipSound2.playFromPositionAsync(0)
        } else if (randomNumber > 50 && randomNumber < 75) {
          this.blipSound3.playFromPositionAsync(0)
        } else {
          this.blipSound4.playFromPositionAsync(0)
        }
      } catch (error) {
        console.log("error playing sound")
      }


    } if (e.type === "p1score") {

      this.setState({
        p1score: this.state.p1score + 1
      })
      console.log(`p1 score: ${this.state.p1score} p2 score: ${this.state.p2score}`)

    } else if (e.type === "p2score") {

      this.setState({
        p2score: this.state.p2score + 1
      })
      console.log(`p1 score: ${this.state.p1score} p2 score: ${this.state.p2score}`)

    } else if (e.type === "paused") {

    }

  }

  async reset() { //Resets game to initial state

    this.setState({
      playAI: !this.state.playAI
    })

    if(this.state.AIStatus === "Off"){
      this.setState({
        AIStatus: "On"
      })
    } else{
      this.setState({
        AIStatus: "Off"
      })
    }

    await this.sleep(200)

    this.engine.swap({
      player1: { position: [this.gridWidth/2, 0.85 * this.gridHeight], xspeed: 0.0, isServing: false, yspeed: 0.0, gridWidth: this.gridWidth, gridHeight: this.gridHeight, width: paddleWidth, height: paddleHeight, renderer: <Paddle /> },
      player2: { position: [this.gridWidth/2, 0.15 * this.gridHeight], xspeed: 0.0, yspeed: 0.0, isServing: false, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'black'} /> },
      ball: {
        position: [this.gridWidth/4, 0.2 * this.gridHeight], xspeed: PongConstants.BALL_SPEED2, yspeed: PongConstants.BALL_SPEED2, windowWidth: window.width, color: 'white', width: ballSize, height: ballSize, renderer: <Ball />
      },
      AI: { position: [this.gridWidth/2, 0.15 * this.gridHeight], tick: 0, tickCount: 20, xspeed: 0.0, yspeed: 0.0, isServing: false, isPlaying: this.state.playAI, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'red'} /> },
    })
    this.setState({
      running: true,
      p1score: 0,
      p2score: 0,
    })
  }

  randomBetween = (min, max) => { // Currently only used for the spawning of apples.
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onPressLeft = () => { this.engine.dispatch({ type: "move-left" }) }
  onPressRight = () => { this.engine.dispatch({ type: "move-right" }) }
  onLetGo = () => { this.engine.dispatch({ type: "stop-moving" }) }
  onPlayerServe = () => { this.engine.dispatch({ type: "p1serve" }) }
  onGoBack = () => {this.navigation.goBack()}


  onEnemyPressLeft = () => { this.engine.dispatch({ type: "enemy-move-left" }) }
  onEnemyPressRight = () => { this.engine.dispatch({ type: "enemy-move-right" }) }
  onEnemyLetGo = () => { this.engine.dispatch({ type: "enemy-stop-moving" }) }
  onPlayer2Serve = () => { this.engine.dispatch({ type: "p2serve" }) }
  onPressToggleAI = () => {
  this.reset()
}





  render() {



    return (
      <View style={styles.container}>

        <Text style={{ zIndex: 1, alignSelf: 'flex-start', fontSize: 15, opacity: 0.3, left: (window.width - gameWidth)/2 + 10, position: 'absolute', color: 'white' }}>
          Player 1 Score: {this.state.p1score} {'\n'}
          Player 2 Score: {this.state.p2score}
        </Text>

        <GameEngine
          ref={(ref) => { this.engine = ref }}
          style={{ zIndex: 0, borderColor: 'white', borderWidth: 2, width: gameWidth, height: gameHeight, flex: null, position: 'absolute', backgroundColor: "#0a0527" }}
          entities={{
            player1: { position: [this.gridWidth/2, 0.85 * this.gridHeight], xspeed: 0.0, isServing: false, yspeed: 0.0, gridWidth: this.gridWidth, gridHeight: this.gridHeight, width: paddleWidth, height: paddleHeight, renderer: <Paddle /> },
            player2: { position: [this.gridWidth/2, 0.15 * this.gridHeight], xspeed: 0.0, yspeed: 0.0, isServing: false, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'black'} /> },
            ball: {
              position: [this.gridWidth/4, 0.2 * this.gridHeight], xspeed: PongConstants.BALL_SPEED2, yspeed: PongConstants.BALL_SPEED2, windowWidth: window.width, color: 'white', width: ballSize, height: ballSize, renderer: <Ball />
            },
            AI: { position: [this.gridWidth/2, 0.15 * this.gridHeight], tick: 0, tickCount: 20, xspeed: 0.0, yspeed: 0.0, isServing: false, isPlaying: this.state.playAI, windowWidth: window.width, width: paddleWidth, height: paddleHeight, renderer: <Paddle color={'red'} /> },
          }}
          systems={[PongGameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}

        />

{!this.state.playAI && <Player2Controls style={{zIndex: 1}} arrowWidth ={this.arrowWidth}onPlayer2Serve = {this.onPlayer2Serve} onEnemyPressLeft={this.onEnemyPressLeft} onEnemyLetGo={this.onEnemyLetGo} onEnemyPressRight={this.onEnemyPressRight}/>}


        <View style={{ flex: 1, zIndex: 1, position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: "81.2%", alignSelf: 'center', width: 2* window.width/3, height: 75 }}>
          <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', 
          alignItems: 'center', backgroundColor: null, width: this.arrowWidth, height: 75 }} onPressIn={this.onPressLeft} onPressOut={this.onLetGo}>
            <Image source={require('../assets/red-arrow.png')} style={{ resizeMode: 'contain', width: this.arrowWidth, height: this.arrowWidth, transform: [{ scaleX: -1 }]}} />
          </Pressable>

          <Pressable style={{ flex: 1, width: this.arrowWidth, borderRadius: this.arrowWidth/2, flexDirection: 'column', justifyContent: 'center', 
          alignItems: 'center', backgroundColor: 'lightblue', height: 75 }} onPress={this.onPlayerServe}>
              <Text style={{ color: 'black' }}>Serve!</Text>
          </Pressable>

          <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'green', 
          alignItems: 'center', backgroundColor: null, width: this.arrowWidth, height: 75 }} onPressIn={this.onPressRight} onPressOut={this.onLetGo}>
            <Image source={require('../assets/red-arrow.png')} style={{ resizeMode: 'contain', width: this.arrowWidth, height: this.arrowWidth}} />
          </Pressable>

        </View>

        <View style={{ zIndex: 1, position: 'absolute', width: window.width, flexDirection: 'row', top: '90%', justifyContent: 'space-evenly' }}>
          <Pressable style={{ width: this.arrowWidth, height: 25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }} onPress={this.onPressToggleAI}>
              <Text style={{ color: 'black', fontSize: 10 }}>Toggle AI Player {this.state.AIStatus}</Text>
          </Pressable>
          <Pressable style={{ width: this.arrowWidth, height: 25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }} onPress={this.onGoBack}>
              <Text style={{ color: 'black' }}>Go Back</Text>
          </Pressable>
        </View>


      </View>
    )
  }
} //End of Pong class



const Player2Controls = (props) => {
  return(

        <View style={{flex: 1, position: 'absolute', alignSelf: 'center', width: 2*window.width/3, flexDirection: 'row', bottom: "81.2%" }}>
        <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', 
          alignItems: 'center', backgroundColor: null, height: 75 }} onPressIn={props.onEnemyPressLeft} onPressOut={props.onEnemyLetGo}>
            <Image source={require('../assets/red-arrow.png')} style={{ resizeMode: 'contain', width: props.arrowWidth, height: props.arrowWidth, transform: [{ scaleX: -1 }]}} />
          </Pressable>

          <Pressable style={{ flex: 1, width: props.arrowWidth, height: 75, borderRadius: props.arrowWidth/2, transform: [{rotateX: '180deg'}, {rotateY: '180deg'}], flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }} onPress={props.onPlayer2Serve}>
              <Text style={{ color: 'black' }}>Serve!</Text>
          </Pressable>

          <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'green', 
          alignItems: 'center', backgroundColor: null, height: 75 }} onPressIn={props.onEnemyPressRight} onPressOut={props.onEnemyLetGo}>
            <Image source={require('../assets/red-arrow.png')} style={{ resizeMode: 'contain', width: props.arrowWidth, height: props.arrowWidth}} />
          </Pressable>

        </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0527",
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

AppRegistry.registerComponent("PongGame", () => Pong);

