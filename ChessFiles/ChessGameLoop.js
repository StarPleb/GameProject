import { getNativeSourceFromSource } from 'expo-av/build/AV';
import {Pressable} from 'react-native'
import BoardArray from './BoardArray';



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  const boardArray = new BoardArray




const ChessGameLoop = (entities, { touches, dispatch, events }) => {



    let board = entities.board
    let blacksTurn = board.isBlacksTurn
    let selectionMade = board.selectionMade

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
    let c1bishop = entities.c1bishop
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
    let c8bishop = entities.c8bishop
    let d8queen = entities.d8queen
    let e8king = entities.e8king
    let f8bishop = entities.f8bishop
    let g8knight = entities.g8knight
    let h8rook = entities.h8rook


    if (events.length) { //Event handler for entities
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "selection") {
                if(blacksTurn) {
                let x = events[i].selection[0]
                let y = events[i].selection[1]
                let pieceName = boardArray.getPieceName(x, y)
                console.log(pieceName)
                if(blacksTurn && pieceName != "nothing"){
                    if(a8rook.position[0] == x && a8rook.position[1] == y){
                        a8rook.isSelected = true
                        dispatch({ type: "selectionmade", selection: "a8rook"})

                    }
                    else if(b8knight.position[0] == x && b8knight.position[1] == y){
                        b8knight.isSelected = true
                        dispatch({ type: "selectionmade", selection: "b8knight"})

                    }
                    else if(c8bishop.position[0] == x && c8bishop.position[1] == y){
                        c8bishop.isSelected = true
                        dispatch({ type: "selectionmade", selection: "c8bishop"})

                    }
                    else if(d8queen.position[0] == x && d8queen.position[1] == y){
                        d8queen.isSelected = true
                        dispatch({ type: "selectionmade", selection: "d8queen"})

                    }
                    else if(e8king.position[0] == x && e8king.position[1] == y){
                        e8king.isSelected = true
                        dispatch({ type: "selectionmade", selection: "e8king"})

                    }
                    else if(f8bishop.position[0] == x && f8bishop.position[1] == y){
                        f8bishop.isSelected = true
                        dispatch({ type: "selectionmade", selection: "f8bishop"})

                    }
                    else if(g8knight.position[0] == x && g8knight.position[1] == y){
                        g8knight.isSelected = true
                        dispatch({ type: "selectionmade", selection: "g8knight"})

                    }
                    else if(h8rook.position[0] == x && h8rook.position[1] == y){
                        h8rook.isSelected = true
                        dispatch({ type: "selectionmade", selection: "h8rook"})

                    }
                    else if(a7pawn.position[0] == x && a7pawn.position[1] == y){
                        a7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "a7pawn"})

                    }
                    else if(b7pawn.position[0] == x && b7pawn.position[1] == y){
                        b7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "b7pawn"})

                    }
                    else if(c7pawn.position[0] == x && c7pawn.position[1] == y){
                        c7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "c7pawn"})

                    }
                    else if(d7pawn.position[0] == x && d7pawn.position[1] == y){
                        d7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "d7pawn"})

                    }
                    else if(e7pawn.position[0] == x && e7pawn.position[1] == y){
                        e7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "e7pawn"})

                    }
                    else if(f7pawn.position[0] == x && f7pawn.position[1] == y){
                        f7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "f7pawn"})

                    }
                    else if(g7pawn.position[0] == x && g7pawn.position[1] == y){
                        g7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "g7pawn"})

                    }
                    else if(h7pawn.position[0] == x && h7pawn.position[1] == y){
                        h7pawn.isSelected = true
                        dispatch({ type: "selectionmade", selection: "h7pawn"})

                    }

                    board.selectionMade = true
                    console.log("selection made")
                    console.log(boardArray.printStuff(x, y))

                }

            } //Selection made if



            } else if (events[i].type === "move-left") {
            } 
        }
    }


    return entities;
    
}

export { ChessGameLoop }