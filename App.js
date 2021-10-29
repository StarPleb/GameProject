import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry, StyleSheet, Text, Dimensions, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable } from 'react-native';
import Snake from './SnakeFiles/Snake.js'
import Pong from './PongFiles/Pong.js'
import OptionsScreen from './SnakeFiles/Snake.js'
import { useNavigation } from '@react-navigation/native';



const windowWidth = Dimensions.get('window').width;
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
          options={{ title: 'Welcome' }}
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
        <Stack.Screen name="OptionsScreen"
          component={OptionsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'blue', width: windowWidth }}>
          <TouchableOpacity onPress={() =>
            navigation.navigate('Snake', { Something: 'icup' })}>
            <Image source={require('./assets/snektrans.png')}
              style={{ resizeMode: 'contain', width: 400, height: 200 }} />
          </TouchableOpacity>


          <Text style={{ alignSelf: 'center', fontSize: 20, color: 'lightgreen' }}>
            Tap if you like snakes
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'black', width: windowWidth }}>

        <TouchableOpacity onPress={() =>
            navigation.navigate('Pong')}>
            <Image source={require('./assets/readyforpong.jpeg')}
              style={{ resizeMode: 'contain', width: windowWidth, height: 320 }} />
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', fontSize: 30, color: 'red' }}>
            Ready or pong... here I come
          </Text>
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'red', width: windowWidth }}>

          <Button
            title="Blank text"
            onPress={() =>
              console.log("Not really tho")
            }
          />
        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'orange', width: windowWidth }}>

          <Button
            title="Blank text"
            onPress={() =>
              console.log("Not really tho")
            }
          />


        </View>

      </ScrollView>
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    flexDirection: 'column'
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
  },
})

AppRegistry.registerComponent("App", () => App);

