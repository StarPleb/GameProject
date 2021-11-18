import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Dimensions, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable, CameraRoll } from 'react-native';

import BoardArrayCell from './BoardArrayCell';

function isDarkCell(i, j) {


    if (i % 2 == 0) {
        if (j % 2 == 0) {
            return false
        }
        else
            return true
    }
    else {
        if (j % 2 == 0) {
            return true
        }
        else
            return false

    }


}


export default class BoardArray{

    constructor() {
        this.arr = [[]]
        this.initalize()
    }

    initalize(){

        this.arr.shift()
        for (let i = 0; i < 8; i++) {
            var tempArray = []
            for (let j = 0; j < 8; j++) {
                let a = new BoardArrayCell(i, j)
                tempArray.push(a)
                console.log('[' + i + ',' + j + '] in here');
            }
            this.arr.push(tempArray)
        }

        // this.arr.forEach((col) => {
        //     col.forEach((item) => { //Column
        //         if(item.xValue == 0 && item.yValue == 0){
        //             item.piece = "rook"
        //             item.isBlack = true
        //         }
        //         else if(item.xValue == 1 && item.yValue == 0){
        //             item.piece = "knight"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 2 && item.yValue == 0){
        //             item.piece = "bishop"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 3 && item.yValue == 0){
        //             item.piece = "queen"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 4 && item.yValue == 0){
        //             item.piece = "king"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 5 && item.yValue == 0){
        //             item.piece = "bishop"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 6 && item.yValue == 0){
        //             item.piece = "knight"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 7 && item.yValue == 0){
        //             item.piece = "rook"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 0 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 1 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 2 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 3 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 4 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 5 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 6 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }
        //         else if(item.xValue == 7 && item.yValue == 1){
        //             item.piece = "pawn"
        //             item.isBlack = true

        //         }

        //         else if(item.xValue == 0 && item.yValue == 7){
        //             item.piece = "rook"
        //             item.isWhite = true

        //         }
        //         else if(item.xValue == 1 && item.yValue == 7){
        //             item.piece = "knight"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 2 && item.yValue == 7){
        //             item.piece = "bishop"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 3 && item.yValue == 7){
        //             item.piece = "queen"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 4 && item.yValue == 7){
        //             item.piece = "king"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 5 && item.yValue == 7){
        //             item.piece = "bishop"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 6 && item.yValue == 7){
        //             item.piece = "knight"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 7 && item.yValue == 7){
        //             item.piece = "rook"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 0 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 1 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 2 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 3 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 4 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 5 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 6 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }
        //         else if(item.xValue == 7 && item.yValue == 6){
        //             item.piece = "pawn"
        //             item.isWhite = true
        //         }

        //     });
        // });
    }

    printStuff(){
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // console.log(this.arr[i][j].piece);
                // console.log(this.arr[i][j].position);

            }
        }
    }

    getPieceName(x, y){
        return this.arr[x][y].piece
    }


    render() {


    }




}