import { StatusBar } from 'expo-status-bar';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { useState, Component } from 'react';
import Constants from './Constants.js';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import EnemyHead from './EnemyHead'
import EnemyTail from './EnemyTail'
import { GameLoop } from './GameLoop.js'
import { Audio } from 'expo-av';
import Grid from './Grid.js';




const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var GridThing = new Grid

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const DeadText = (props) => {

  return(
    <TouchableOpacity style={{ zIndex: 0.5, alignSelf: 'center' }} onPress={props.eventThing}>
    <Text style={{ flexDirection: 'row', justifyContent: 'center', fontSize: 20 }}>
    Tap to try again.
  </Text>
  </TouchableOpacity>
  )
}

const NotDeadText = () => {

  return(
    <Text style={{ flexDirection: 'row', color: '#F8F0E3', justifyContent: 'center', fontSize: 20 }}>
    Tap to try again.
  </Text>
  )
}



export default class Snake extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;


    this.state = {
      running: true,
      score: 0,
      myArr: [],
      showGrid: false,
      pauseCounter: 2
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
    this.gameMusic = new Audio.Sound()
    this.pauseSound = new Audio.Sound()
    this.resumeSound = new Audio.Sound()





    const status = {
      shouldPlay: false,
      volume: 0.6
    }

    const status2 = {
      shouldPlay: true,
      volume: 0.7,
      isLooping: true
    }


    await this.gameMusic.loadAsync(require('./sounds/game_music.mp3'), status2)
    await this.dieSound.loadAsync(require('./sounds/explosion_03.wav'), status)
    await this.eatSound.loadAsync(require('./sounds/collectApple.wav'), status)
    await this.pauseSound.loadAsync(require('./sounds/pause.wav'), status)
    await this.resumeSound.loadAsync(require('./sounds/resume.wav'), status)


    let callForGameMusic = await this.gameMusic.getStatusAsync()




  }

  sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // async playEatSound() {
  //   this.eatSound.playAsync()
  //   await this.sleep(1200)
  //   this.eatSound.setPositionAsync(0)

  // }

  // async playDieSound() {
  //   this.dieSound.playAsync()
  //   await this.sleep(1200)
  //   this.dieSound.setPositionAsync(0)
  // }


  onEvent = (e) => { //Event handler for the <GameEngine/>
    if (e.type === "game-over") {
      if (this.state.running) {
        this.dieSound.playFromPositionAsync(0)
      }
      this.setState({
        running: false
      })

    } else if (e.type === "restart") {
      this.setState({
        running: true,
      })
      console.log(GridThing.state.gridArray[0][0])

    } else if (e.type === "collision") {
      this.eatSound.playFromPositionAsync(0);
      this.setState({
        score: this.state.score + 1
      })
    } else if (e.type === "paused"){
      if(this.state.pauseCounter%2===0){
        this.pauseSound.playFromPositionAsync(0)
        this.engine.stop()
      } else{
        this.engine.start()
        this.resumeSound.playFromPositionAsync(0)
      }
      
      this.setState({
        pauseCounter: this.state.pauseCounter + 1
      })
    }
  }

  reset = () => { //Resets game to initial state
    this.engine.swap({
      head: { position: [0, 0], xspeed: Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, currentMove: "move-right", hasMoved: "false", renderer: <Head /> },
      food: {
        position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)],
        size: Constants.CELL_SIZE, renderer: <Food />
      },
      tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
      ticker: { tickCount: 0, tickerRunning: false, tailSlicing: true },
      enemyHead: { justSpawned: true, position: [randomBetween(6, Constants.GRID_SIZE - 1), randomBetween(6, Constants.GRID_SIZE - 1)], xspeed: -Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, renderer: <EnemyHead /> },
      enemyTail: { size: Constants.CELL_SIZE, elements: [], renderer: <EnemyTail /> },
      enemyTicker: { tickCount: 0, tickerRunning: false },
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

  onPressLeft = () => { this.engine.dispatch({ type: "move-left" }) }
  onPressRight = () => { this.engine.dispatch({ type: "move-right" }) }
  onPressUp = () => { this.engine.dispatch({ type: "move-up" }) }
  onPressDown = () => { this.engine.dispatch({ type: "move-down" }) }
  onPressTryAgain = () => { this.reset() }
  onPressGrid = () => { this.setState({ showGrid: !this.state.showGrid }) }
  onPressStart = () => { this.engine.dispatch({ type: "paused" }) }
  onChangeShit = () => { this.engine.dispatch({ type: "change-shit" }) }



  render() {


    return (
      <View style={styles.container}>
        {this.state.showGrid && <Grid />}
        <View style={styles.halfContainer}>
          <GameEngine
            ref={(ref) => { this.engine = ref }}
            style={{ width: this.boardSize, height: this.boardSize, flex: null, position: 'absolute', backgroundColor: this.state.running ? "#5ba81d" : "gray" }}
            entities={{
              head: { position: [0, 0], xspeed: Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, currentMove: "move-right", hasMoved: "false", renderer: <Head /> },
              food: {
                position: [randomBetween(0, Constants.GRID_SIZE - 1), randomBetween(0, Constants.GRID_SIZE - 1)],
                size: Constants.CELL_SIZE, renderer: <Food />
              },
              tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
              ticker: { tickCount: 0, tickerRunning: false, tailSlicing: true },
              enemyHead: { justSpawned: true, position: [randomBetween(6, Constants.GRID_SIZE - 1), randomBetween(6, Constants.GRID_SIZE - 1)], xspeed: -Constants.SNAKE_SPEED, yspeed: 0, size: Constants.CELL_SIZE, renderer: <EnemyHead /> },
              enemyTail: { size: Constants.CELL_SIZE, elements: [], renderer: <EnemyTail /> },
              enemyTicker: { tickCount: 0, tickerRunning: false },

            }}
            systems={[GameLoop]}
            onEvent={this.onEvent}
            running={this.state.running}

          />
          
        </View>

        <View style={styles.container, { width: 0.75 * window.width, position: 'absolute', flex: 1, alignContent: 'flex-start', zIndex: 1}}>
          <Text style={{ zIndex: 1, alignSelf: 'center', fontSize: 20 }}>
            Score: {this.state.score}
          </Text>
          {this.state.running && <NotDeadText/>}
          {!this.state.running && <DeadText eventThing = {this.onPressTryAgain}/>}
          <OptionsButton style = {{zIndex: 1, position: 'absolute'}} startButton ={this.onPressStart}/>

        </View>

        <View style={styles.halfContainer}>

          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink' }} onPress={this.onPressUp}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{ zIndex: 0.5 }} onPress={this.onPressLeft}>
                <View style={styles.control} />
              </TouchableOpacity>

              <TouchableOpacity style={{ zIndex: 0.5 }} onPress={this.onChangeShit}>
                <View style={[styles.control, { backgroundColor: "#454545" }]} />
              </TouchableOpacity>

              <TouchableOpacity style={{ zIndex: 0.5 }} onPress={this.onPressRight}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink' }} onPress={this.onPressDown}>
                <View style={styles.control} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
} //End of Snake class

const OptionsButton = (props) => {
  return (
      <View style={{ width: 0.75 * window.width, flexDirection: 'row', justifyContent: 'space-between', zIndex: 0.5, position: 'absolute', alignItems: 'center' }}>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0.5 }}>
        <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink' }} onPress={console.log("YUHH")}>
          <View style={styles.oval} />
          </TouchableOpacity>
          <Text style={{ zIndex: 1, fontSize: 10, color: 'gray' }}>
            Options
          </Text>
        </View>

        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0.5 }}>
        <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink' }} onPress={props.startButton}>
          <View style={styles.oval} />
          </TouchableOpacity>
          <Text style={{ zIndex: 1, fontSize: 10, color: 'gray' }}>
            Start
          </Text>
        </View>
      </View>

  );
};

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
    zIndex: 0
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
  oval: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#BA180E",
    transform: [{ scaleX: 2 }],
  },
});

AppRegistry.registerComponent("SnakeGame", () => Snake);

