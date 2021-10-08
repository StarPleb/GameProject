import React, { Component } from 'react';
import Constants from './Constants';
import GridNode from './GridNode';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';

function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



export default class Grid {

    constructor() {
        this.x_length = Constants.GRID_SIZE
        this.y_length = Constants.GRID_SIZE
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.gridArray = []

    }

    initializeArray(){
        for (let i = 0; i <= this.x_length; i++) {
            var tempArray = []
            for (let j = 0; j <= this.y_length; j++) {
                let a = new GridNode(i, j)
                tempArray.push(a)
                console.log('[' + i + ',' + j + ']');
            }
            this.gridArray.push(tempArray)
        }
    }

    printStuff(){

        console.log("Grid printStuff() method")
        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                console.log(item.xValue, item.yValue);
            });
        });

    }

    changeValues(){

        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                item.xValue = item.xValue + 10
                item.yValue = item.yValue + 10
            });
        });
    }

    checkForPlayer(headX, headY){
        let i = Math.round(headX)
        let j = Math.round(headY)
        this.gridArray[i][j].hasPlayer = true
        console.log(`Position ${[i, j]} has player is ${this.gridArray[i][j].hasPlayer}`)
    }

    }

    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F0E3",
      justifyContent: 'center',
      flexDirection: 'column'
    },
    halfContainer: {
      flex: 0.5,
      backgroundColor: "#F8F0E3",
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'column'
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