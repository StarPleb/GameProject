import BoardCell from './BoardCell';
import GamePiece from './GamePiece';

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Dimensions, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable, CameraRoll } from 'react-native';


function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const arr = [require('./chessPieces/pawn.png'), require('./chessPieces/rook.png'), require('./chessPieces/knight.png'),
require('./chessPieces/bishop.png'), require('./chessPieces/queen.png'), require('./chessPieces/king.png')];

function pieceImage(name){
    if(name == "pawn"){
        return arr[0]
    }
    else if(name == "rook"){
        return arr[1]
    }
    else if (name == "knight"){
        return arr[2]
    }
    else if (name == "bishop"){
        return arr[3]
    }
    else if (name == "queen"){
        return arr[4]
    }
    else if(name == "king"){
        return arr[5]
    }
    else {
        return null
    }
}




export default class Board extends Component {

    constructor(props) {
        super(props)
        this.x_length = 8
        this.y_length = 8
        this.cellSize = props.CELL_SIZE
        this.boardSize = props.boardSize,
        this.engine = props.engine,
        this.gridArray = props.gridArray,
        this.pieceArray = props.pieceArray,
        this.selectedPiece = props.selectedPiece,
        this.initialized = props.initialized
        this.initializeArray()
    }
    
    async componentDidMount() {
        //For setting up audio playback and loading all sound files.
        //This function should probably be in its own file eventually, to load all of the app's sounds.
    
      }
    
      async componentWillUnmount() {
    
    
      }

      initializeArray() {
        this.pieceArrayFunc()
        this.boardArrayFunc()
        }

    

    boardArrayFunc() {

        for (let i = 0; i < this.x_length; i++) {
            var tempArray = []
            for (let j = 0; j < this.y_length; j++) {
                let a = new BoardCell(i, j, this.cellSize)
                tempArray.push(a)
                console.log('[' + i + ',' + j + ']');
            }
            this.gridArray.push(tempArray)
        }

    }

    pieceArrayFunc() {

        for (let i = 0; i < this.x_length; i++) {
            var tempArray = []
            for (let j = 0; j < this.y_length; j++) {
                let a = new GamePiece(i, j, this.cellSize, "pawn", this.engine)
                tempArray.push(a)
                console.log('[' + i + ',' + j + ']');
            }
            this.pieceArray.push(tempArray)
        }

    }

    printStuff() {

        console.log("Grid printStuff() method")
        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                console.log(item.xValue, item.yValue);
            });
        });

    }
    

    printStuff() {

        console.log("Grid printStuff() method")
        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                console.log(item.xValue, item.yValue);
            });
        });

    }




    render() {



        let boardCells = this.gridArray.map(function (row) {
            return row.map(function (cell, idx) {
                return (
                    <View key={idx} style={{ width: cell.size, height: cell.size, position: 'absolute', left: cell.xValue * cell.size, top: cell.yValue * cell.size, backgroundColor: cell.isDark ? "#B58951" : "#F6E1C7", }} />
                )
            });
        })

        let pieceCells = this.pieceArray.map(function (row) {
            return row.map(function (cell, idx) {
                
                return (
                    <TouchableOpacity key={idx} onPress={ () => {
                        cell.onSomething()
                        console.log(`${cell.name} selected`)
                        console.log(`${cell.isSelected}`)
                    }
                    } >
                        <View style={{ width: cell.size, height: cell.size, position: 'absolute', left: cell.xValue * cell.size, top: cell.yValue * cell.size, backgroundColor: cell.isDark ? "#B58951" : "#F6E1C7", justifyContent: 'flex-end' }}>
                            <Image source={pieceImage(cell.name)}
                                style={{ resizeMode: 'contain', alignSelf: 'center', width: cell.size * 0.75, height: cell.size * 0.75, tintColor: cell.isBlack ? "black" : "white" }} />
                        </View>
                    </TouchableOpacity>
                )
            });
        })

        return (

            <View style={{ width: this.boardSize, height: this.boardSize }}>
                {boardCells}
                {pieceCells}
            </View>
        )
    }

}