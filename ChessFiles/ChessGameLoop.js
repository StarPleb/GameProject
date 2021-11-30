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
    let selectedPiece = entities.selectedSquare
    let blacksTurn = board.blacksTurn
    let justMounted = board.justMounted
    let selectionMade = board.selectionMade

    if(justMounted){
        boardArray.initalize()
        board.justMounted = false
    }

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

    let whitePieceArray = [a1rook, b1knight, c1bishop, d1queen, e1king, f1bishop, g1knight, h1rook, a2pawn, b2pawn, c2pawn,
    d2pawn, e2pawn, f2pawn, g2pawn, h2pawn]
    let blackPieceArray =[a8rook, b8knight, c8bishop, d8queen, e8king, f8bishop, g8knight, h8rook, a7pawn, b7pawn, 
    c7pawn, d7pawn, e7pawn, f7pawn, g7pawn, h7pawn]

    if (events.length) { //Event handler for entities
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "selection") { //Square touched in Chess.js

                let lastPiece = board.lastPiece
                let x = events[i].selection[0]
                let y = events[i].selection[1]

                let pieceName = boardArray.getPieceName(x, y)
                console.log(`Selected piece: ${pieceName}`)
                let selectedPieceisBlack = boardArray.isBlack(x, y)
                let selectedPieceisWhite = boardArray.isWhite(x, y)

                if(selectedPieceisBlack && blacksTurn && pieceName != lastPiece){ //Blacks turn


                    console.log("in blacksturn")

                    for(let j = 0; j < blackPieceArray.length; j++){
                        if(blackPieceArray[j].position[0] == x && blackPieceArray[j].position[1] == y){
                            blackPieceArray[j].isSelected = true
                            board.selectedPiece = blackPieceArray[j].piece
                            selectedPiece.position = [x, y]
                            dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                        } else{
                            blackPieceArray[j].isSelected = false

                        }
                    }
                   
                    
                    if(pieceName != "nothing"){ //Square touched has a piece
                        board.selectionMade = true
                        console.log("selection made")
                        board.lastPiece = pieceName
                        board.lastPosition = [x, y]
                    }


                }
                else if(!selectedPieceisBlack && blacksTurn && selectionMade){ //Black made a move
                    let info = boardArray.movePiece(x, y, board.lastPosition, blacksTurn)

                    for(let i = 0 ; i < blackPieceArray.length; i++){

                        let x1 = blackPieceArray[i].position[0]
                        let y1 = blackPieceArray[i].position[1]
                        let x2 = board.lastPosition[0]
                        let y2 = board.lastPosition[1]
                        let newx = info[0]
                        let newy = info[1]
                        let lastPiece = info[2]
                        let legalMoveMade = info[3]

                        if(legalMoveMade && x1 == x2 && y1 == y2){

                            blackPieceArray[i].position = [newx, newy]
                            dispatch({ type: "movemade"})
                            selectedPiece.position = [0, 100]
                            board.blacksTurn = !board.blacksTurn
                            board.selectionMade = false
                            board.lastPiece= "nothing"


                            if(lastPiece != "nothing"){
                                for(let j = 0; j < whitePieceArray.length; j++){
                                    if(whitePieceArray[j].piece == lastPiece){
                                        console.log(`RIP ${whitePieceArray[j].piece}`)
                                        whitePieceArray[j].isAlive = false
                                        whitePieceArray[j].position=[0, 100] //TO THE SHADOW REALM
                                        if(whitePieceArray[j].piece === "e1king"){
                                            dispatch({ type: "checkmate"})
                                        }
                                        break;
                                    }
                                }
                            }

                            break;


                        }

                    }



                }
                if(!blacksTurn && selectedPieceisWhite && pieceName != lastPiece){ //White's turn

                    console.log("in whites turn")

                    for(let j = 0; j < whitePieceArray.length; j++){
                        if(whitePieceArray[j].position[0] == x && whitePieceArray[j].position[1] == y){
                            whitePieceArray[j].isSelected = true
                            board.selectedPiece = whitePieceArray[j].piece
                            selectedPiece.position = [x, y]
                            dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                        } else{
                            whitePieceArray[j].isSelected = false

                        }
                    }


                    if(pieceName != "nothing"){
                        board.selectionMade = true
                        console.log("selection made")
                        board.lastPiece = pieceName
                        board.lastPosition = [x, y]

                        
                    }


                }
                else if(!selectedPieceisWhite && !blacksTurn && selectionMade){ //White made move
                    let info = boardArray.movePiece(x, y, board.lastPosition, blacksTurn)
                    for(let i = 0 ; i < whitePieceArray.length; i++){
                        let x1 = whitePieceArray[i].position[0]
                        let y1 = whitePieceArray[i].position[1]
                        let x2 = board.lastPosition[0]
                        let y2 = board.lastPosition[1]
                        let newx = info[0]
                        let newy = info[1]
                        let lastPiece = info[2]
                        let legalMoveMade = info[3]


                        if(legalMoveMade && x1 == x2 && y1 == y2){

                            whitePieceArray[i].position = [newx, newy]
                            dispatch({ type: "movemade"})
                            selectedPiece.position = [0, 100]
                            board.blacksTurn = !board.blacksTurn
                            board.selectionMade = false
                            board.lastPiece= "nothing"

                            if(lastPiece != "nothing"){
                                for(let j = 0; j < blackPieceArray.length; j++){
                                    console.log(whitePieceArray[j].piece)
                                    if(blackPieceArray[j].piece == lastPiece){
                                        console.log(`RIP ${blackPieceArray[j].piece}`)
                                        blackPieceArray[j].isAlive = false
                                        blackPieceArray[j].position = [0, 100] //TO THE SHADOW REALM
                                        if(blackPieceArray[j].piece === "e8king"){
                                            dispatch({ type: "checkmate"})
                                        }
                                        break;
                                    }
                                }
                            }

                            break;

                        }

                    }



                }
                

            } // end of selection event
             else if (events[i].type === "checkmate") {
                boardArray.initalize()
                 
            } 
        }
    }


    return entities;
    
}

export { ChessGameLoop }