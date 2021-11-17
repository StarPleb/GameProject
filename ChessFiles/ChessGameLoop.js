import { getNativeSourceFromSource } from 'expo-av/build/AV';
import {Pressable} from 'react-native'



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }




const ChessGameLoop = (entities, { touches, dispatch, events }) => {



    let board = entities.board
    let blacksTurn = board.isBlacksTurn

    let a2pawn = entities.a2pawn
    let b2pawn = entities.b2pawn
    let c2pawn = entities.c2pawn
    let d2pawn = entities.d2pawn
    let e2pawn = entities.e2pawn
    let f2pawn = entities.f2pawn
    let g2pawn = entities.g2pawn
    let h2pawn = entities.h2pawn
    let a1rook = entities.a1rook
    let b1knight = entities.b1knight
    let c1knight = entities.c1knight
    let d1queen = entities.d1queen
    let e1king = entities.e1king
    let f1bishop = entities.f1bishop
    let g1knight = entities.g1knight
    let h1rook = entities.h1rook

    let a7pawn = entities.a7pawn
    let b7pawn = entities.b7pawn
    let c7pawn = entities.c7pawn
    let d7pawn = entities.d7pawn
    let e7pawn = entities.e7pawn
    let f7pawn = entities.f7pawn
    let g7pawn = entities.g7pawn
    let h7pawn = entities.h7pawn
    let a8rook = entities.a8rook
    let b8knight = entities.b8knight
    let c8knight = entities.c8knight
    let d8queen = entities.d8queen
    let e8king = entities.e8king
    let f8bishop = entities.f8bishop
    let g8knight = entities.g8knight
    let h8rook = entities.h8rook


    if (events.length) { //Event handler for entities
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "selection") {
                let x = events[i].selection[0]
                let y = events[i].selection[1]
                if(blacksTurn){
                    if(a8rook.position[0] == x && a8rook.position[1] == y){
                        a8rook.isSelected = true
                    }
                    else if(b8knight.position[0] == x && b8knight.position[1] == y){
                        b8knight.isSelected = true
                    }

                }

            } else if (events[i].type === "move-left") {
            } 
        }
    }


    return entities;
    
}

export { ChessGameLoop }