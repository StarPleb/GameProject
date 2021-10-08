import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry, StyleSheet, Text, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable } from 'react-native';
import Snake from './SnakeFiles/Snake.js'




export default function App() {
  return (
    //<WhoKnows/>
    <Snake />
  )
}


class WhoKnows extends Component {

  //Testing how touchable opacity is rendered on Android
  constructor(props) {
    super(props);
    this.state = {
      count : 0
    }
  }
  onPressHello = () => {this.setState({count: this.state.count + 1})}


  render() {


    return (
      <View style={styles.container}>
        <TouchableOpacity style={{backgroundColor: 'pink'}} onPress={this.onPressHello}>
        <Text>
          Wow {this.state.count}
        </Text>
          </TouchableOpacity>


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
})

AppRegistry.registerComponent("App", () => App);

