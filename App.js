import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry, StyleSheet, Text, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal } from 'react-native';
import Snake from './SnakeFiles/Snake.js'




export default function App() {
  return (
      <Snake/>
  )
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

