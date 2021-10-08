import React, { Component } from 'react';
import Constants from './Constants';
import GridNode from './GridNode';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';

function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


export default class Grid extends Component {


    constructor(props) {
        super(props);
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.state={
            gridArray: [[]]
        }
    }


    render() {

        const x_length = Constants.GRID_SIZE
        const y_length = Constants.GRID_SIZE

        for (let i = 0; i < x_length; i++) {
            for (let j = 0; j < y_length; j++) {

                let a1 = randomBetween(0, 255)
                let a2 = randomBetween(0, 255)
                let a3 = randomBetween(0, 255)
                
                let a = (<GridNode xValue = {i} yValue = {j} color = {`rgb(${a1},${a2},${a3})`}
            />)
                this.state.gridArray.push(a)
                console.log('[' + i + ',' + j + ']');
            }
        }

        let gridList = this.state.gridArray.map((el, idx) => {
            return(
                <View key ={idx}>
                {el}
                </View>
            )
        })



        return (
            <View style = {styles.container, {zIndex: 1, position: 'absolute', justifyContent: 'flex-start', top: 371}}>
                <View style = {styles.halfContainer}>
                    <View style={{ zIndex: 1, width: this.boardSize, height: this.boardSize, position: 'absolute'}}>
                        {gridList}
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