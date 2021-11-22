import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry, StyleSheet, Text, Dimensions, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable } from 'react-native';
import Snake from './SnakeFiles/Snake.js'
import Pong from './PongFiles/Pong.js'
import Chess from './ChessFiles/Chess.js'
import OptionsScreen from './SnakeFiles/Snake.js'
import TicTacToe from './TicTacToeFiles/tictactoe.js'
import { useNavigation } from '@react-navigation/native';
//import { WebView } from 'react-native-webview';


const windowWidth = Dimensions.get('window').width;
const window = Dimensions.get("window");
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <StackedScreen />
  )
}

const StackedScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen name="Snake"
          component={Snek}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pong"
          component={PongGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TicTacToe"
          component={TTTGame}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="OptionsScreen"
          component={OptionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chess"
          component={Chezz}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {


  return (
    <>
    <Image source={require('./assets/Logo.png')} style={styles.logoImage} />
    <SafeAreaView style={styles.container}>

      <Text style={{ alignSelf: 'center', fontSize: 35, color: 'black', fontStyle: 'italic', marginBottom: 5 }}>
        Select Game
      </Text>
      <Text style={{ alignSelf: 'flex-start', fontSize: 20, color: 'black' }}>

      </Text>
      <View style = {{height: windowWidth, position: 'absolute'}}>
          <Image source={require('./assets/wavy.jpg')}
              style={{ resizeMode: 'stretch', width: window.width, height: window.height/2 }} />
            </View>
      <ScrollView horizontal={true} style={styles.scrollView}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: null, width: 0.12 * window.width, height: window.height / 3, borderRadius: 20, }}>

</View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: null, width: 0.75 * window.width, height: window.height / 3, borderRadius: 20, }}>
        <View style = {styles.backgroundContainer}>
          <Image source={require('./assets/grass.jpg')}
              style={{ resizeMode: 'stretch', borderRadius: 20, width: 0.75 * window.width, height: window.height/3 }} />
            </View>
          <TouchableOpacity onPress={() => navigation.navigate('Snake', { Something: 'icup' })}>
            <Image source={require('./assets/snektrans.png')}
              style={{ resizeMode: 'contain', zIndex: 1, width: 0.75 * window.width, height: window.height / 4 }} />
          </TouchableOpacity>




          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Eat apples and not yourself...
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: null, width: windowWidth, height: window.height / 3, borderRadius: 20, }}>

          <TouchableOpacity onPress={() => navigation.navigate('Pong')}>
            <Image source={require('./assets/readyforpong.jpeg')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 4 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Ready or pong... here I come.
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', width: windowWidth, height: window.height / 3, borderRadius: 20, }}>

          <TouchableOpacity onPress={() => navigation.navigate('TicTacToe')}>
            <Image source={require('./assets/Tictactoescreenshot.png')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 4 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', fontStyle: 'italic' }}>
            X's and O's
          </Text>

        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: null, width: windowWidth, height: window.height / 3, borderRadius: 20, }}>

          <TouchableOpacity onPress={() => navigation.navigate('Chess')}>
            <Image source={require('./assets/humanchess.jpeg')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 4 }} />
          </TouchableOpacity>

          <View style = {styles.backgroundContainer}>

            </View>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Check me out, mate.
          </Text>
        </View>

      </ScrollView>
      <Text style={{ top: 30, alignSelf: 'center', fontSize: 20, color: 'white' }}>
        Ad space here
      </Text>
    </SafeAreaView></>


  );
};


const Snek = () => {
  const navigation = useNavigation();

  return <Snake navigation={navigation} />
}

const PongGame = () => {
  const navigation = useNavigation();

  return <Pong navigation={navigation} />
}

const TTTGame = () => {
  const navigation = useNavigation();
  
  return <TicTacToe navigation={navigation} />
}
const Chezz = () => {
  const navigation = useNavigation();

  return <Chess navigation={navigation} />
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    flexDirection: 'column',
  },
  halfContainer: {
    flex: 1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  scrollView: {
    backgroundColor: null,
    marginHorizontal: 0,
    maxHeight: window.height / 3,
    borderRadius: 20,
    top: 10,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20, 
    color: '#333',
    letterSpacing: 1,
  },
  logoImage: {
    marginTop: 30,
    resizeMode: 'contain',
    width: windowWidth,
    height: 100,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    flex:1,
    flexDirection: 'row'
  },

})

AppRegistry.registerComponent("App", () => App);

