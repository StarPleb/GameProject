import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useState } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView, View, Switch, Dimensions, Button, Alert, Pressable } from 'react-native';
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
const ballSize = 10





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
    this.boardSize = 36 * ballSize;
    this.boardWidth = 36 * ballSize
    this.boardheight = 50 * ballSize
    this.engine = null;
    this.navigation = props.navigation


    this.state = {
      playAI: true,
      running: true,
      p1score: 0,
      p2score: 0,
      myArr: [],
      pauseCounter: 2,
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

  reset = () => { //Resets game to initial state
    this.engine.swap({
      player1: { position: [18, 47], xspeed: 0.0, isServing: false, yspeed: 0.0, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle /> },
      player2: { position: [18, 2], xspeed: 0.0, yspeed: 0.0, isServing: false, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle color={'black'} /> },
      ball: {
        position: [3, 1], xspeed: PongConstants.BALL_SPEED, yspeed: PongConstants.BALL_SPEED, windowWidth: window.width, color: 'white', width: ballSize, height: ballSize, renderer: <Ball />
      },
      AI: { position: [18, 2], tick: 0, tickCount: 10, xspeed: 0.0, yspeed: 0.0, isServing: false, isPlaying: this.state.playAI, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle color={'red'} /> },
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
  this.setState({
    playAI: !this.state.playAI
  })
  this.reset()


}





  render() {



    return (
      <View style={styles.container}>

        <Text style={{ zIndex: 1, alignSelf: 'flex-start', fontSize: 15, opacity: 0.3, left: 20, position: 'absolute', color: 'white' }}>
          Player 1 Score: {this.state.p1score} {'\n'}
          Player 2 Score: {this.state.p2score}
        </Text>

        <View style={{ zIndex: 0.1, position: 'absolute', flexDirection: 'row', bottom: window.height - window.height / 9 }}>
          <Pressable style={{ zIndex: 0.1 }} onPress={this.onGoBack}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
              <Text style={{ color: 'black' }}>Go Back</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ zIndex: 0.1, position: 'absolute', flexDirection: 'row', bottom: window.height - window.height / 6 }}>
          <Pressable style={{ zIndex: 0.1 }} onPressIn={this.onEnemyPressLeft} onPressOut={this.onEnemyLetGo}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
              <Text style={{ color: 'black' }}>Go Left!</Text>
            </View>
          </Pressable>

          <Pressable style={{ zIndex: 0.1 }} onPress={this.onPlayer2Serve}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
              <Text style={{ color: 'black' }}>Serve!</Text>
            </View>
          </Pressable>

          <Pressable onPressIn={this.onEnemyPressRight} onPressOut={this.onEnemyLetGo}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
              <Text style={{ color: 'black' }}>Go Right!</Text>
            </View>
          </Pressable>

        </View>

        <GameEngine
          ref={(ref) => { this.engine = ref }}
          style={{ width: this.boardWidth, height: this.boardheight, flex: null, position: 'absolute', backgroundColor: this.state.running ? "black" : "gray" }}
          entities={{
            player1: { position: [18, 47], xspeed: 0.0, isServing: false, yspeed: 0.0, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle /> },
            player2: { position: [18, 2], xspeed: 0.0, yspeed: 0.0, isServing: false, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle color={'black'} /> },
            ball: {
              position: [3, 1], xspeed: PongConstants.BALL_SPEED, yspeed: PongConstants.BALL_SPEED, windowWidth: window.width, color: 'white', width: ballSize, height: ballSize, renderer: <Ball />
            },
            AI: { position: [18, 2], tick: 0, tickCount: 10, xspeed: 0.0, yspeed: 0.0, isServing: false, isPlaying: this.state.playAI, windowWidth: window.width, width: 30, height: 10, renderer: <Paddle color={'red'} /> },
          }}
          systems={[PongGameLoop]}
          onEvent={this.onEvent}
          running={this.state.running}

        />

        <View style={{ zIndex: 0.1, position: 'absolute', flexDirection: 'row', top: window.height - window.height / 6 }}>
          <Pressable style={{ zIndex: 0.1 }} onPressIn={this.onPressLeft} onPressOut={this.onLetGo}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
              <Text style={{ color: 'black' }}>Go Left!</Text>
            </View>
          </Pressable>

          <Pressable style={{ zIndex: 0.1 }} onPress={this.onPlayerServe}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
              <Text style={{ color: 'black' }}>Serve!</Text>
            </View>
          </Pressable>

          <Pressable onPressIn={this.onPressRight} onPressOut={this.onLetGo}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue' }}>
              <Text style={{ color: 'black' }}>Go Right!</Text>
            </View>
          </Pressable>

        </View>
        <View style={{ zIndex: 0.1, position: 'absolute', flexDirection: 'row', top: window.height - window.height / 10 }}>
          <Pressable style={{ zIndex: 0.1 }} onPress={this.onPressToggleAI}>
            <View style={{ width: 100, height: 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
              <Text style={{ color: 'black' }}>Toggle AI Player</Text>
            </View>
          </Pressable>
        </View>


      </View>
    )
  }
} //End of Pong class


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

AppRegistry.registerComponent("PongGame", () => Pong);
