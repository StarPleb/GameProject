import { StatusBar } from 'expo-status-bar';
import React, { PureComponent, useState } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView, View, Switch, Dimensions, Button, Alert } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import { Component } from 'react';
import Constants from './Constants.js';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import EnemyHead from './EnemyHead'
import EnemyTail from './EnemyTail'
import { GameLoop } from './GameLoop.js'
import { Audio } from 'expo-av';
import Grid from './Grid.js';
import { useNavigation } from '@react-navigation/native';






const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

var GridThing = new Grid

const soundFiles = [
  {
    id: '001',
    sound: require('./sounds/game_music.mp3'),
  },
  {
    id: '002',
    sound: require('./sounds/explosion_03.wav'),
  },
  {
    id: '003',
    sound: require('./sounds/collectApple.wav'),
  },
  {
    id: '004',
    sound: require('./sounds/pause.wav'),
  },
  {
    id: '005',
    sound: require('./sounds/resume.wav'),
  },
]

const getImageSource = (serviceName) => {
  if (serviceName === "AC") {
    return img[0].image
  } else if (serviceName === "Doctors") {
    return img[1].image
  } else if (serviceName === "Sales") {
    return img[2].image
  } else if (serviceName === "Beauty") {
    return img[3].image
  } else if (serviceName === "Loans") {
    return img[4].image
  } else if (serviceName === "Repair") {
    return img[5].image
  } else if (serviceName === "Contractors") {
    return img[6].image
  } else if (serviceName === "Fitness") {
    return img[7].image
  } else if (serviceName === "Hotels") {
    return img[8].image
  } else {
    return img[0].image
  }

}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const DeadText = (props) => {

  return (
    <TouchableOpacity style={{ zIndex: 0.5, alignSelf: 'center' }} onPress={props.eventThing}>
      <Text style={{ flexDirection: 'row', justifyContent: 'center', fontSize: 20 }}>
        Tap to try again.
      </Text>
    </TouchableOpacity>
  )
}



const NotDeadText = () => {

  return (
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
    this.navigation = props.navigation


    this.state = {
      running: true,
      score: 0,
      myArr: [],
      showGrid: false,
      pauseCounter: 2,
      bgMusic: true,
      soundEffects: true
    }

  }

  toggleBGMusic = () => { this.setState({
    bgMusic: !this.state.bgMusic
  }) }

  toggleSoundEffects = () => { this.setState({
    soundEffects: !this.state.soundEffects
  }) }


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


    try {
      await this.gameMusic.loadAsync(soundFiles[0].sound, status2)
      await this.dieSound.loadAsync(soundFiles[1].sound, status)
      await this.eatSound.loadAsync(soundFiles[2].sound, status)
      await this.pauseSound.loadAsync(soundFiles[3].sound, status)
      await this.resumeSound.loadAsync(soundFiles[4].sound, status)
  
  
    } catch (error) {
      console.log("Error loading sounds")
    }



  }

  async componentWillUnmount() {
    await this.gameMusic.stopAsync()
    await this.gameMusic.unloadAsync()
    await this.dieSound.unloadAsync()
    await this.eatSound.unloadAsync()
    await this.pauseSound.unloadAsync()
    await this.resumeSound.unloadAsync()

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
    } else if (e.type === "paused") {
      if (this.state.pauseCounter % 2 === 0) {
        this.pauseSound.playFromPositionAsync(0)
        this.engine.stop()
      } else {
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
  onPressOptions = () => { this.navigation.goBack() }
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

        <View style={styles.container, { width: 0.75 * window.width, position: 'absolute', flex: 1, alignContent: 'flex-start', zIndex: 1 }}>
          <Text style={{ zIndex: 1, alignSelf: 'center', fontSize: 20 }}>
            Score: {this.state.score}
          </Text>
          {this.state.running && <NotDeadText />}
          {!this.state.running && <DeadText eventThing={this.onPressTryAgain} />}
          <OptionsButton style={{ zIndex: 1, position: 'absolute' }} startButton={this.onPressStart} optionsButton={this.onPressOptions}/>

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
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0.5 }}>
        <TouchableOpacity style={{ zIndex: 0.5, backgroundColor: 'pink' }} onPress={props.optionsButton}>
          <View style={styles.oval} />
        </TouchableOpacity>
        <Text style={{ zIndex: 1, fontSize: 10, color: 'gray' }}>
          Go Back
        </Text>
      </View>

      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0.5 }}>
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

const OptionsScreen = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const bgMusicValue = route.params.bgMusicValue
  const bgMusicSwitch = route.params.bgMusicSwitch
  const soundEffectsValue = route.params.soundEffectsValue
  const soundEffectsSwitch = route.params.soundEffectsSwitch





  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start' }}>
      <Text style={{ fontSize: 25, flex: 0.2, alignSelf: 'center', color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
        Game Settings
      </Text>

      <ScrollView style={styles.scrollView}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />

        <View style ={{width: window.width/2, flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
          <Text style ={{ fontSize: 15, alignSelf: 'center', color: 'black' }}>
            Background Music
          </Text>
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        </View>
      </ScrollView>

      <Button
        title="Play Snake"
        onPress={() =>
          navigation.navigate('Snake', { Something: 'icup' })
        }
      />
      <Button
        title="Blank text"
        onPress={() =>
          console.log("Not really tho")
        }
      />
    </SafeAreaView>

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

AppRegistry.registerComponent("SnakeGame", () => Snake);

