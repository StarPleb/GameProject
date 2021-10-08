import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { useState, Component } from 'react';
import Constants from './Constants.js';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import { GameLoop } from './GameLoop.js'
import { Audio } from 'expo-av';




const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}



export default class Snake extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;


    this.state = {
      running: true,
      score: 0,
      myArr: []
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
    this.eatSound = new Audio.Sound()
    this.dieSound = new Audio.Sound()

    const status = {
      shouldPlay: false
    }

    await this.eatSound.loadAsync(require('./sounds/collectApple.wav'), status)
    await this.dieSound.loadAsync(require('./sounds/explosion_03.wav'), status)

  }

  sleep(ms) { //Useful for resetting a sound AFTER it has been played. 
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async playEatSound() {
    this.eatSound.playAsync();
    await this.sleep(1100)
    this.eatSound.setPositionAsync(0)

  }

  async playDieSound() {
    this.dieSound.playAsync();
    await this.sleep(1500)
    this.dieSound.setPositionAsync(0)
  }


  onEvent = (e) => { //Event handler for the <GameEngine/>
    if (e.type === "game-over") {
      if (this.state.running) {
        this.playDieSound()
        this.showDeathScreen()
        alert("Game Over");
      }
      this.setState({
        running: false
      })

    } else if (e.type === "restart") {
      this.setState({
        running: true,
      })
      console.log("Running!")

    } else if (e.type === "collision") {
      this.playEatSound()
      this.setState({
        score: this.state.score + 1
      })
    }
  }

  reset = () => { //Resets game to initial state
    this.engine.swap({
      head: { position: [0, 0], xspeed: Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, renderer: <Head /> },
      food: {
        position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)],
        size: Constants.CELL_SIZE, renderer: <Food />
      },
      tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
      ticker: { tickCount: 0, tickerRunning: false, tailSlicing: true },
    })
    this.setState({
      running: true,
      score: 0,
      myArr: []

    })
  }

  randomBetween = (min, max) => { // Currently only used for the spawning of apples.
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  showDeathScreen() {
    let temp = (
      <Text style={{ flexDirection: 'row', justifyContent: 'center', fontSize: 20 }}>
        Tap to try again.
      </Text>
    )
    this.state.myArr.push(temp)
    this.setState({
      myArr: this.state.myArr
    })
  }

  onPressLeft = () => { this.engine.dispatch({ type: "move-left" }) }
  onPressRight = () => { this.engine.dispatch({ type: "move-right" }) }
  onPressUp = () => { this.engine.dispatch({ type: "move-up" }) }
  onPressDown = () => { this.engine.dispatch({ type: "move-down" }) }
  onPressTryAgain = () => {this.reset()}


  render() {

    let Arr = this.state.myArr.map((a, i) => {
      return (
          <TouchableOpacity key = {i} style={{ zIndex: 0.5}} onPress={this.onPressTryAgain}>
              {a}
          </TouchableOpacity>)
    })



    return (
      <View style={styles.container}>
        <View style={styles.halfContainer}>
          <GameEngine
            ref={(ref) => { this.engine = ref }}
            style={{ width: this.boardSize, height: this.boardSize, flex: null, position: 'absolute', backgroundColor: "#5ba81d" }}
            entities={{
              head: { position: [0, 0], xspeed: Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, currentMove: "move-right", hasMoved: "false", renderer: <Head /> },
              food: {
                position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)],
                size: Constants.CELL_SIZE, renderer: <Food />
              },
              tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
              ticker: { tickCount: 0, tickerRunning: false, tailSlicing: true },
            }}
            systems={[GameLoop]}
            onEvent={this.onEvent}
            running={this.state.running}

          />
        </View>

        <View style = {styles.container, {zIndex: 1, position: 'absolute'}}>
        <Text style={{ zIndex: 1, alignSelf: 'center', fontSize: 20 }}>
            Score: {this.state.score}
          </Text>
        {Arr}
        </View>

        <View style={styles.halfContainer}>

          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{zIndex: 0.5, backgroundColor: 'pink'}} onPress={this.onPressUp}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{ zIndex: 0.5}} onPress={this.onPressLeft}>
                <View style={styles.control} />
              </TouchableOpacity>

              <View style={[styles.control, { backgroundColor: "#454545" }]} />

              <TouchableOpacity style={{ zIndex: 0.5 }} onPress={this.onPressRight}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink'}} onPress={this.onPressDown}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 0.5,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividingContainer: {
    flex: 0.1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center'
  },
});

AppRegistry.registerComponent("SnakeGame", () => Snake);

