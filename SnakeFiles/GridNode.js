import React, {Component, PureComponent} from 'react';
import Constants from './Constants';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';



export default class GridNode {

    constructor(xInput, yInput){
        this.hasPlayer = false,
        this.size = Constants.CELL_SIZE,
        this.xValue = xInput,
        this.yValue = yInput
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