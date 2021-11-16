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
    <SafeAreaView style={styles.container}>
      <Text style={{ alignSelf: 'center', fontSize: 35, color: 'black', fontStyle: 'italic', marginBottom: 5}}>
        Classic Collection
      </Text>
      <Text style={{ alignSelf: 'flex-start', fontSize: 20, color: 'black' }}>
        Game Selection
      </Text>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'blue', width: windowWidth, height: window.height / 2 }}>
          <TouchableOpacity onPress={() =>
            navigation.navigate('Snake', { Something: 'icup' })}>
            <Image source={require('./assets/snektrans.png')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 3 }} />
          </TouchableOpacity>


          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Eat apples and not yourself...
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'black', width: windowWidth, height: window.height / 2 }}>

          <TouchableOpacity onPress={() =>
            navigation.navigate('Pong')}>
            <Image source={require('./assets/readyforpong.jpeg')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 3 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Ready or pong... here I come.
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white', width: windowWidth, height: window.height / 2 }}>

        <TouchableOpacity onPress={() =>
            navigation.navigate('TicTacToe')}>
            <Image source={require('./assets/Tictactoescreenshot.png')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 3 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', fontStyle: 'italic' }}>
            X's and O's
</Text>

        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'orange', width: windowWidth, height: window.height / 2 }}>

        <TouchableOpacity onPress={() =>
            navigation.navigate('Chess')}>
            <Image source={require('./assets/humanchess.jpeg')}
              style={{ resizeMode: 'contain', width: window.width, height: window.height / 3 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', fontStyle: 'italic' }}>
            Check me out, mate.
          </Text>
        </View>

      </ScrollView>
      <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black' }}>
        Bottom Text
      </Text>
    </SafeAreaView>


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
    backgroundColor: "#F8F0E3",
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
    backgroundColor: 'black',
    marginHorizontal: 0,
    maxHeight: window.height / 2
  },
})

AppRegistry.registerComponent("App", () => App);

