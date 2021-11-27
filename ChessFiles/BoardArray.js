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


export default class BoardArray {

    constructor() {
        this.arr = [[]]
        this.initalize()
    }

    initalize() {

        this.arr = [[]]
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

    printStuff(x, y) {
        return `Piece position: (${this.arr[x][y].position[0]}, ${this.arr[x][y].position[1]})`
    }

    getPieceName(x, y) {
        return this.arr[x][y].piece
    }

    getPosition(x, y) {
        return this.arr[x][y].position

    }

    isBlack(x, y) {
        return this.arr[x][y].isBlack

    }

    isWhite(x, y) {
        return this.arr[x][y].isWhite

    }

    isAlive(x, y) {
        return this.arr[x][y].isAlive
    }

    legalMoveChecker(pieceType, x1, y1, x2, y2, blacksTurn) {

        if(blacksTurn){
        if (pieceType === "pawn") {

                if (x2 - x1 == 1 && y2 == y2 && this.arr[x1][x2].hasMoved) {
                    return true
                } else if(x2-x1 == 2 && y1 == y2 && !this.arr[x1][x2].hasMoved){
                    return true

                } else if(x2 - x1 == 1 && Math.abs(y2-y1) == 1){
                    if(this.arr[x2][y2].isWhite){
                        return true

                    } else{
                        return false
                    }
                } else if(true){
                    

                }


        } else if (pieceType === "knight" && this.arr[x2][y2].isBlack) {
            if (Math.abs(x1 - x2) == 2 && Math.abs(y1 - y2) == 1) {
                return true

            } else if (Math.abs(y1 - y2) == 2 && Math.abs(x1 - x2) == 1) {
                return true

            }
            else {
                return false
            }
        } else if(pieceType === "bishop"){
            if(Math.abs(x1-y1) == Math.abs(x2-y2)){
                return true
            } else{
                return false
            }
        } else if(pieceType == "rook"){
            if(x1 == x2 || y1 == y2){

            }
        }

    } else{ //Whites turn

    }



    }

    movePiece(x, y, lastPosition, blacksTurn) {

        let legalMove = false
        let x1 = lastPosition[0]
        let y1 = lastPosition[1]

        let pieceMoving = this.arr[x1][y1].piece
        let pieceType = pieceMoving.substring(2)
        console.log(pieceType)
        let pieceIsBlack = this.arr[x1][y1].isBlack
        let pieceIsWhite = this.arr[x1][y1].isWhite
        let pieceHasMoved = this.arr[x1][y1].hasMoved


        let destinationPiece = this.arr[x][y].piece
        let destinationIsBlack = this.arr[x][y].isBlack
        let destinationIsWhite = this.arr[x][y].isWhite

        if(pieceType == "knight"){
            if(Math.abs(x - x1) == 2 && Math.abs(y - y1) == 1){
                legalMove = true
            } else if(Math.abs(y-y1) == 2 && Math.abs(x-x1) == 1){
                legalMove = true
            }
            else{
                legalMove = false
            }

        } else if(pieceType == "bishop"){

            if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){
                legalMove = true
            } else{
                legalMove = false
            }

        } else if(pieceType == "pawn"){
            if(pieceIsBlack &&  !pieceHasMoved && x == x1 && (y - y1 == 2 || y - y1 == 1)){
                legalMove = true
            }
            else if(pieceIsBlack && pieceHasMoved && x == x1 && y - y1 == 1){
                legalMove = true
            } 
            else if(pieceIsWhite && !pieceHasMoved && x == x1 && (y1 - y == 2 || y1 - y == 1)){
                legalMove = true
            }
            else if(pieceIsWhite && pieceHasMoved && x == x1 && y1 - y == 1){
                legalMove = true
            }
             else{
                legalMove = false
                console.log("in pawn else")

            }
        } else if(pieceType == "rook"){
            if(x == x1 || y == y1){
                legalMove = true
            } else{
                legalMove = false
            }
        } else if(pieceType == "queen"){
            if(x == x1 || y == y1){
                legalMove = true
            } else if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){
                legalMove = true
            }
            else{
                legalMove = false
            }

        } else if(pieceType == "king"){
            if(Math.abs(x - x1) <= 1 && Math.abs(y - y1) <= 1){
                legalMove = true

            } else{
                legalMove = false
            }
        }

        if (blacksTurn && pieceIsBlack && !destinationIsBlack && legalMove) {

            this.arr[x][y].piece = pieceMoving
            this.arr[x][y].isBlack = pieceIsBlack
            this.arr[x][y].isWhite = pieceIsWhite
            this.arr[x][y].hasMoved = true
            this.arr[x1][y1].piece = "nothing"
            this.arr[x1][y1].isBlack = false
            this.arr[x1][y1].isWhite = false
            this.arr[x1][y1].hasMoved = false




            if (destinationIsWhite) {
                return [x, y, destinationPiece, legalMove]
            } else {
                return [x, y, "nothing", legalMove]
            }




        }
        else if (!blacksTurn && pieceIsWhite && !destinationIsWhite && legalMove) {
            console.log("in whites move turn")
            this.arr[x][y].piece = pieceMoving
            this.arr[x][y].isBlack = pieceIsBlack
            this.arr[x][y].isWhite = pieceIsWhite
            this.arr[x][y].hasMoved = true
            this.arr[x1][y1].piece = "nothing"
            this.arr[x1][y1].isBlack = false
            this.arr[x1][y1].isWhite = false
            this.arr[x1][y1].hasMoved = false


            if (destinationIsBlack) {
                return [x, y, destinationPiece, legalMove]
            }
            else {
                return [x, y, "nothing", legalMove]
            }


        }
        else{
            return [x, y, "nothing", legalMove]
        }




    }


    render() {


    }




}