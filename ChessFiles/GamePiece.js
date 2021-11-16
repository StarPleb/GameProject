import { Component } from "react"


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

function isBlackPiece(i, j){

    if(j == 0 || j == 1){
        return true
    }
    if(j == 6 || j == 7){
        return false
    }



}

function getPieceName(i, j) {


    if (j == 1 || j == 6) {
        return "pawn"
    }

    if (j > 1 && j < 6) {
        return "blank"
    }
    if (j == 0 && i == 0) {
        return "rook"
    }
    else if (j == 0 && i == 1) {
        return "knight"
    }
    else if (j == 0 && i == 2) {
        return "bishop"
    }
    else if (j == 0 && i == 3) {
        return "queen"
    }
    else if (j == 0 && i == 4) {
        return "king"
    }
    else if (j == 0 && i == 5) {
        return "bishop"
    }
    else if (j == 0 && i == 6) {
        return "knight"
    }
    else if (j == 0 && i == 7) {
        return "rook"
    }
    else if (j == 7 && i == 0) {
        return "rook"
    }
    else if (j == 7 && i == 1) {
        return "knight"
    }
    else if (j == 7 && i == 2) {
        return "bishop"
    }
    else if (j == 7 && i == 3) {
        return "queen"
    }
    else if (j == 7 && i == 4) {
        return "king"
    }
    else if (j == 7 && i == 5) {
        return "bishop"
    }
    else if (j == 7 && i == 6) {
        return "knight"
    }
    else if (j == 7 && i == 7) {
        return "rook"
    }



}


export default class GamePiece {

    constructor(xInput, yInput, size, engine) {
        this.name = getPieceName(xInput, yInput),
            this.size = size,
            this.isDark = isDarkCell(xInput, yInput),
            this.isSelected = false,
            this.xValue = xInput,
            this.yValue = yInput
            this.isBlack = isBlackPiece(xInput, yInput),
            this.isSelected = false
            this.engine = engine
            this.name = getPieceName(xInput, yInput)
    }

    onSomething = () => { this.isSelected = !this.isSelected }






}