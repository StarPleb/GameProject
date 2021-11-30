import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Dimensions, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable, CameraRoll } from 'react-native';
import BoardArrayCell from './BoardArrayCell';


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
            }
            this.arr.push(tempArray)
        }
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

    legalMoveChecker(x, y, piecePosition, blacksTurn) {

        let x1 = piecePosition[0]
        let y1 = piecePosition[1]
        let pieceMoving = this.arr[x1][y1].piece
        let pieceType = pieceMoving.substring(2)
        let pieceIsBlack = this.arr[x1][y1].isBlack
        let pieceIsWhite = this.arr[x1][y1].isWhite
        let pieceHasMoved = this.arr[x1][y1].hasMoved


        let destinationPiece = this.arr[x][y].piece
        let destinationIsBlack = this.arr[x][y].isBlack
        let destinationIsWhite = this.arr[x][y].isWhite

        if(blacksTurn){
            if(pieceType == "knight"){
                if(Math.abs(x - x1) == 2 && Math.abs(y - y1) == 1){
                    return true
                } else if(Math.abs(y-y1) == 2 && Math.abs(x-x1) == 1){
                    return true
                }
                else{
                    return false
                }
    
            } else if(pieceType == "bishop"){
    
                if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){
                    // first is if x1, y1 < x, y
                    // second is if x1, y1 > x, y

                        if(x > x1 && y < y1){ //Moving right and up the board (y = 0 is top of board)


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x > x1 && y > y1){ //Moving right and down the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x < x1 && y < y1){ //Moving left and up the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x< x1 && y > y1){ //Moving left and down the board

                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        }       

                } else{
                    return false
                }
    
            } else if(pieceType == "pawn"){
                if(!pieceHasMoved && x == x1 && (y - y1 == 2 || y - y1 == 1) && !destinationIsWhite){
                    return true
                }
                else if(pieceHasMoved && x == x1 && y - y1 == 1 && !destinationIsWhite){
                    return true
                }
                else if(destinationIsWhite && Math.abs(x - x1) == 1 && y - y1 == 1){
                    return true
                }  
                 else{
                    return false
                    console.log("in pawn else")
    
                }
            } else if(pieceType == "rook"){
                console.log(`in rook`)
                if(x == x1 && y != y1){ // Moving along column
                    if(y > y1){
                        console.log(`in y > y1`)

                        let count = 0
                        let goal = y - y1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[x][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[x][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
                    }
                    else if (y < y1){
                        console.log(`in y < y1`)


                        let count = 0
                        let goal = y1 - y
                        for(let i = y1 - 1; i >= y; i--){
                            if(this.arr[x][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[x][i].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }

                        }

                        console.log(`count : ${count} goal" ${goal}`)


                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                    }
                }
                else if(y == y1 && x != x1){ // Moving along row
                    if(x > x1){
                        console.log(`in x > x1`)

                        let count = 0
                        let goal = x - x1
                        for(let i = x1 + 1; i <= x; i++){
                            if(this.arr[i][y].piece == "nothing"){
                                count += 1
                            } else if(i == x && this.arr[i][y].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
                    }
                    else if (x < x1){
                        console.log(`in x < x1`)


                        let count = 0
                        let goal = x1 - x
                        for(let i = x1 - 1; i >= x; i--){
                            if(this.arr[i][y].piece == "nothing"){
                                count += 1
                            } else if(i == x && this.arr[i][y].isWhite){
                                count += 1
                            }
                            else{
                                break
                            }

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                    }
                    
                }
                 else{
                    return false
                }
            } else if(pieceType == "queen"){
                if(x == x1 || y == y1){ // Queen's "rook" movements
                    if(x == x1 && y != y1){ // Moving along column
                        if(y > y1){
                            console.log(`in y > y1`)
                            let count = 0
                            let goal = y - y1
                            for(let i = y1 + 1; i <= y; i++){
                                console.log(`${i}`)
                                if(this.arr[x][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[x][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
        
                            }
        
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
                        }
                        else if (y < y1){
                            console.log(`in y < y1`)
        
        
                            let count = 0
                            let goal = y1 - y
                            for(let i = y1 - 1; i >= y; i--){
                                if(this.arr[x][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[x][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
        
                            }
        
                            console.log(`count : ${count} goal" ${goal}`)
        
        
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
        
                        }
                    }
                    else if(y == y1 && x != x1){ // Moving along row
                        if(x > x1){
                            console.log(`in x > x1`)
        
                            let count = 0
                            let goal = x - x1
                            for(let i = x1 + 1; i <= x; i++){
                                if(this.arr[i][y].piece == "nothing"){
                                    count += 1
                                } else if(i == x && this.arr[i][y].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
        
                            }
        
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
                        }
                        else if (x < x1){
                            console.log(`in x < x1`)
        
        
                            let count = 0
                            let goal = x1 - x
                            for(let i = x1 - 1; i >= x; i--){
                                if(this.arr[i][y].piece == "nothing"){
                                    count += 1
                                } else if(i == x && this.arr[i][y].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
        
                            }
        
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
        
                        }
                        
                    }
                     else{
                        return false
                    }
                } //Rook movement 
                 else if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){ //Queen's "bishop" movements 
                     
                            if(x > x1 && y < y1){ //Moving right and up the board (y = 0 is top of board)
    
    
                            let count = 0
                            let goal = Math.abs(y - y1)
                            let tempX = x1 + 1
                            for(let i = y1 - 1; i >= y; i--){
                                console.log(`${i}`)
                                if(this.arr[tempX][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[tempX][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
                                tempX += 1
    
                            }
    
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
    
                            } else if(x > x1 && y > y1){ //Moving right and down the board
    
    
                            let count = 0
                            let goal = Math.abs(y - y1)
                            let tempX = x1 + 1
                            for(let i = y1 + 1; i <= y; i++){
                                console.log(`${i}`)
                                if(this.arr[tempX][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[tempX][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
                                tempX += 1
    
                            }
    
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
    
                            } else if(x < x1 && y < y1){ //Moving left and up the board
    
    
                            let count = 0
                            let goal = Math.abs(y - y1)
                            let tempX = x1 - 1
                            for(let i = y1 - 1; i >= y; i--){
                                console.log(`${i}`)
                                if(this.arr[tempX][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[tempX][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
                                tempX -= 1
    
                            }
    
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
    
                            } else if(x< x1 && y > y1){ //Moving left and down the board
    
                            let count = 0
                            let goal = Math.abs(y - y1)
                            let tempX = x1 - 1
                            for(let i = y1 + 1; i <= y; i++){
                                console.log(`${i}`)
                                if(this.arr[tempX][i].piece == "nothing"){
                                    count += 1
                                } else if(i == y && this.arr[tempX][i].isWhite){
                                    count += 1
                                }
                                else{
                                    break
                                }
                                tempX -= 1
    
                            }
    
                            if(count == goal){
                                return true
                            } else{
                                return false
                            }
    
                            }
                }
                else{
                    return false
                }
    
            } else if(pieceType == "king"){
                if(Math.abs(x - x1) <= 1 && Math.abs(y - y1) <= 1){
                    return true
    
                } else{
                    return false
                }
            } else{
                return false
            }

    } else{ //Whites turn

        if(pieceType == "knight"){
            if(Math.abs(x - x1) == 2 && Math.abs(y - y1) == 1){
                return true
            } else if(Math.abs(y-y1) == 2 && Math.abs(x-x1) == 1){
                return true
            }
            else{
                return false
            }

        } else if(pieceType == "bishop"){

            if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){
                    // first is if x1, y1 < x, y
                    // second is if x1, y1 > x, y

                    if(x > x1 && y < y1){ //Moving right and up the board (y = 0 is top of board)


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x > x1 && y > y1){ //Moving right and down the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x < x1 && y < y1){ //Moving left and up the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x< x1 && y > y1){ //Moving left and down the board

                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        }       
            } else{
                return false
            }

        } else if(pieceType == "pawn"){
            if(!pieceHasMoved && x == x1 && (y1 - y == 2 || y1 - y == 1) && !destinationIsBlack){
                return true
            }
            else if(pieceHasMoved && x == x1 && y1 - y == 1 && !destinationIsBlack){
                return true
            }
            else if(destinationIsBlack && Math.abs(x - x1) == 1 && y1 - y == 1){
                return true
            } 
             else{
                return false
            }
        } else if(pieceType == "rook"){
            if(x == x1 && y != y1){ // Moving along column
                if(y > y1){
                    console.log(`in y > y1`)
                    let count = 0
                    let goal = y - y1
                    for(let i = y1 + 1; i <= y; i++){
                        console.log(`${i}`)
                        if(this.arr[x][i].piece == "nothing"){
                            count += 1
                        } else if(i == y && this.arr[x][i].isBlack){
                            count += 1
                        }
                        else{
                            break
                        }

                    }

                    if(count == goal){
                        return true
                    } else{
                        return false
                    }
                }
                else if (y < y1){
                    console.log(`in y < y1`)


                    let count = 0
                    let goal = y1 - y
                    for(let i = y1 - 1; i >= y; i--){
                        if(this.arr[x][i].piece == "nothing"){
                            count += 1
                        } else if(i == y && this.arr[x][i].isBlack){
                            count += 1
                        }
                        else{
                            break
                        }

                    }

                    console.log(`count : ${count} goal" ${goal}`)


                    if(count == goal){
                        return true
                    } else{
                        return false
                    }

                }
            }
            else if(y == y1 && x != x1){ // Moving along row
                if(x > x1){
                    console.log(`in x > x1`)

                    let count = 0
                    let goal = x - x1
                    for(let i = x1 + 1; i <= x; i++){
                        if(this.arr[i][y].piece == "nothing"){
                            count += 1
                        } else if(i == x && this.arr[i][y].isBlack){
                            count += 1
                        }
                        else{
                            break
                        }

                    }

                    if(count == goal){
                        return true
                    } else{
                        return false
                    }
                }
                else if (x < x1){
                    console.log(`in x < x1`)


                    let count = 0
                    let goal = x1 - x
                    for(let i = x1 - 1; i >= x; i--){
                        if(this.arr[i][y].piece == "nothing"){
                            count += 1
                        } else if(i == x && this.arr[i][y].isBlack){
                            count += 1
                        }
                        else{
                            break
                        }

                    }

                    if(count == goal){
                        return true
                    } else{
                        return false
                    }

                }
                
            }
             else{
                return false
            }
        } else if(pieceType == "queen"){
            if(x == x1 || y == y1){ // Queen's "rook" movements
                if(x == x1 && y != y1){ // Moving along column
                    if(y > y1){
                        console.log(`in y > y1`)
                        let count = 0
                        let goal = y - y1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[x][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[x][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
    
                        }
    
                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
                    }
                    else if (y < y1){
                        console.log(`in y < y1`)
    
    
                        let count = 0
                        let goal = y1 - y
                        for(let i = y1 - 1; i >= y; i--){
                            if(this.arr[x][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[x][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
    
                        }
    
                        console.log(`count : ${count} goal" ${goal}`)
    
    
                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
    
                    }
                }
                else if(y == y1 && x != x1){ // Moving along row
                    if(x > x1){
                        console.log(`in x > x1`)
    
                        let count = 0
                        let goal = x - x1
                        for(let i = x1 + 1; i <= x; i++){
                            if(this.arr[i][y].piece == "nothing"){
                                count += 1
                            } else if(i == x && this.arr[i][y].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
    
                        }
    
                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
                    }
                    else if (x < x1){
                        console.log(`in x < x1`)
    
    
                        let count = 0
                        let goal = x1 - x
                        for(let i = x1 - 1; i >= x; i--){
                            if(this.arr[i][y].piece == "nothing"){
                                count += 1
                            } else if(i == x && this.arr[i][y].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
    
                        }
    
                        if(count == goal){
                            return true
                        } else{
                            return false
                        }
    
                    }
                    
                }
                 else{
                    return false
                }
            } //Rook movement 
             else if(Math.abs(x1-y1) == Math.abs(x-y) || Math.abs(x1 + y1) == Math.abs(x + y)){ //Queen's "bishop" movements 
                 
                        if(x > x1 && y < y1){ //Moving right and up the board (y = 0 is top of board)


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x > x1 && y > y1){ //Moving right and down the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 + 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX += 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x < x1 && y < y1){ //Moving left and up the board


                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 - 1; i >= y; i--){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        } else if(x< x1 && y > y1){ //Moving left and down the board

                        let count = 0
                        let goal = Math.abs(y - y1)
                        let tempX = x1 - 1
                        for(let i = y1 + 1; i <= y; i++){
                            console.log(`${i}`)
                            if(this.arr[tempX][i].piece == "nothing"){
                                count += 1
                            } else if(i == y && this.arr[tempX][i].isBlack){
                                count += 1
                            }
                            else{
                                break
                            }
                            tempX -= 1

                        }

                        if(count == goal){
                            return true
                        } else{
                            return false
                        }

                        }
            }
            else{
                return false
            }

        } else if(pieceType == "king"){
            if(Math.abs(x - x1) <= 1 && Math.abs(y - y1) <= 1){
                return  true

            } else{
                return false
            }
        }
        else{
            return false
        }

    }



    }

    movePiece(x, y, lastPosition, blacksTurn) {

        let legalMove = this.legalMoveChecker(x, y, lastPosition, blacksTurn)
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