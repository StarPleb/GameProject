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
    let blacksTurn = board.blacksTurn
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

    let whitePieceArray = [a1rook, b1knight, c1bishop, d1queen, e1king, f1bishop, g1knight, h1rook, a2pawn, b2pawn, c2pawn,
    d2pawn, e2pawn, f2pawn, g2pawn, h2pawn]
    let blackPieceArray =[a8rook, b8knight, c8bishop, d8queen, e8king, f8bishop, g8knight, h8rook, a7pawn, b7pawn, 
    c7pawn, d7pawn, e7pawn, f7pawn, g7pawn, h7pawn]

    if (events.length) { //Event handler for entities
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "selection") {

                let lastPiece = board.lastPiece
                let x = events[i].selection[0]
                let y = events[i].selection[1]

                let pieceName = boardArray.getPieceName(x, y)
                let selectedPiecePosition = boardArray.getPosition(x, y)
                let selectedPieceisBlack = boardArray.isBlack(x, y)
                let selectedPieceisWhite = boardArray.isWhite(x, y)

                console.log(pieceName)
                console.log(lastPiece)
                console.log(blacksTurn)
                console.log(selectedPieceisBlack)



                if(selectedPieceisBlack && blacksTurn && pieceName != lastPiece){


                    console.log("in blacksturn")
                    if(a8rook.position[0] == x && a8rook.position[1] == y){
                        a8rook.isSelected = true
                        board.selectedPiece = "a8rook"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(b8knight.position[0] == x && b8knight.position[1] == y){
                        b8knight.isSelected = true
                        board.selectedPiece = "b8knight"

                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(c8bishop.position[0] == x && c8bishop.position[1] == y){
                        c8bishop.isSelected = true
                        board.selectedPiece = "c8bishop"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(d8queen.position[0] == x && d8queen.position[1] == y){
                        d8queen.isSelected = true
                        board.selectedPiece = "d8queen"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(e8king.position[0] == x && e8king.position[1] == y){
                        e8king.isSelected = true
                        board.selectedPiece = "e8king"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(f8bishop.position[0] == x && f8bishop.position[1] == y){
                        f8bishop.isSelected = true
                        board.selectedPiece = "f8bishop"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(g8knight.position[0] == x && g8knight.position[1] == y){
                        g8knight.isSelected = true
                        board.selectedPiece = "g8knight"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(h8rook.position[0] == x && h8rook.position[1] == y){
                        h8rook.isSelected = true
                        board.selectedPiece = "h8rook"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(a7pawn.position[0] == x && a7pawn.position[1] == y){
                        a7pawn.isSelected = true
                        board.selectedPiece = "a7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(b7pawn.position[0] == x && b7pawn.position[1] == y){
                        b7pawn.isSelected = true
                        board.selectedPiece = "b7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(c7pawn.position[0] == x && c7pawn.position[1] == y){
                        c7pawn.isSelected = true
                        board.selectedPiece = "c7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(d7pawn.position[0] == x && d7pawn.position[1] == y){
                        d7pawn.isSelected = true
                        board.selectedPiece = "d7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(e7pawn.position[0] == x && e7pawn.position[1] == y){
                        e7pawn.isSelected = true
                        board.selectedPiece = "e7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(f7pawn.position[0] == x && f7pawn.position[1] == y){
                        f7pawn.isSelected = true
                        board.selectedPiece = "f7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(g7pawn.position[0] == x && g7pawn.position[1] == y){
                        g7pawn.isSelected = true
                        board.selectedPiece = "g7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(h7pawn.position[0] == x && h7pawn.position[1] == y){
                        h7pawn.isSelected = true
                        board.selectedPiece = "h7pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    if(pieceName != "nothing"){
                        board.selectionMade = true
                        console.log("selection made")
                        board.lastPiece = pieceName
                        board.lastPosition = [x, y]
                    }

                    console.log(!selectedPieceisBlack)
                    console.log(blacksTurn)
                    console.log(selectionMade)

                }
                else if(!selectedPieceisBlack && blacksTurn && selectionMade){
                    let info = boardArray.movePiece(x, y, board.lastPosition, blacksTurn)

                    for(let i = 0 ; i < blackPieceArray.length; i++){
                        console.log("in for blackpiecearray")
                        console.log(blackPieceArray[i].position)
                        let x1 = blackPieceArray[i].position[0]
                        let y1 = blackPieceArray[i].position[1]
                        let x2 = board.lastPosition[0]
                        let y2 = board.lastPosition[1]

                        console.log(`entity position: ${x1}, ${y1}`)
                        console.log(`last entity selected position: ${x2}, ${y2}`)
                        console.log(info)
                        let newx = info[0]
                        let newy = info[1]
                        let lastPiece = info[2]
                        console.log(`new stuff: ${newx}, ${newy}`)




                        if(x1 == x2 && y1 == y2){

                            console.log("in position = lastposition")
                            blackPieceArray[i].position = [newx, newy]
                            board.blacksTurn = !board.blacksTurn
                            board.selectionMade = false
                            board.lastPiece= "nothing"
                            console.log(`last piece ${lastPiece}`)


                            if(lastPiece != "nothing"){
                                for(let j = 0; j < whitePieceArray.length; j++){
                                    console.log(whitePieceArray[j].piece)
                                    if(whitePieceArray[j].piece == lastPiece){
                                        console.log("in death")
                                        whitePieceArray[j].isAlive = false
                                        whitePieceArray[j].position=[0, 100] //TO THE SHADOW REALM
                                        break;
                                    }
                                }
                            }

                            break;


                        }

                    }



                }
                if(!blacksTurn && selectedPieceisWhite && pieceName != lastPiece){

                    console.log("in whites turn")
                    if(a1rook.position[0] == x && a1rook.position[1] == y){
                        a1rook.isSelected = true
                        board.selectedPiece = "a1rook"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(b1knight.position[0] == x && b1knight.position[1] == y){
                        b1knight.isSelected = true
                        board.selectedPiece = "b1knight"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(c1bishop.position[0] == x && c1bishop.position[1] == y){
                        c1bishop.isSelected = true
                        board.selectedPiece = "c1bishop"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(d1queen.position[0] == x && d1queen.position[1] == y){
                        d1queen.isSelected = true
                        board.selectedPiece = "d1queen"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(e1king.position[0] == x && e1king.position[1] == y){
                        e1king.isSelected = true
                        board.selectedPiece = "e1king"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(f1bishop.position[0] == x && f1bishop.position[1] == y){
                        f1bishop.isSelected = true
                        board.selectedPiece = "f1bishop"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(g1knight.position[0] == x && g1knight.position[1] == y){
                        g1knight.isSelected = true
                        board.selectedPiece = "g1knight"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(h1rook.position[0] == x && h1rook.position[1] == y){
                        h1rook.isSelected = true
                        board.selectedPiece = "h1rook"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(a2pawn.position[0] == x && a2pawn.position[1] == y){
                        a2pawn.isSelected = true
                        board.selectedPiece = "a2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(b2pawn.position[0] == x && b2pawn.position[1] == y){
                        b2pawn.isSelected = true
                        board.selectedPiece = "b2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(c2pawn.position[0] == x && c2pawn.position[1] == y){
                        c2pawn.isSelected = true
                        board.selectedPiece = "c2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(d2pawn.position[0] == x && d2pawn.position[1] == y){
                        d2pawn.isSelected = true
                        board.selectedPiece = "d2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(e2pawn.position[0] == x && e2pawn.position[1] == y){
                        e2pawn.isSelected = true
                        board.selectedPiece = "e2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(f2pawn.position[0] == x && f2pawn.position[1] == y){
                        f2pawn.isSelected = true
                        board.selectedPiece = "f2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(g2pawn.position[0] == x && g2pawn.position[1] == y){
                        g2pawn.isSelected = true
                        board.selectedPiece = "g2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }
                    else if(h2pawn.position[0] == x && h2pawn.position[1] == y){
                        h2pawn.isSelected = true
                        board.selectedPiece = "h2pawn"
                        dispatch({ type: "selectionmade", selection: boardArray.getPieceName(x, y)})

                    }

                    if(pieceName != "nothing"){
                        board.selectionMade = true
                        console.log("selection made")
                        board.lastPiece = pieceName
                        board.lastPosition = [x, y]

                        
                    }


                }
                else if(!selectedPieceisWhite && !blacksTurn && selectionMade){
                    let info = boardArray.movePiece(x, y, board.lastPosition, blacksTurn)

                    for(let i = 0 ; i < whitePieceArray.length; i++){
                        console.log("in for whitepiecearray")
                        console.log(whitePieceArray[i].position)
                        let x1 = whitePieceArray[i].position[0]
                        let y1 = whitePieceArray[i].position[1]
                        let x2 = board.lastPosition[0]
                        let y2 = board.lastPosition[1]

                        console.log(`entity position: ${x1}, ${y1}`)
                        console.log(`last entity selected position: ${x2}, ${y2}`)
                        console.log(info)
                        let newx = info[0]
                        let newy = info[1]
                        let lastPiece = info[2]

                        console.log(`new stuff: ${newx}, ${newy}`)




                        if(x1 == x2 && y1 == y2){

                            console.log("in position = lastposition")
                            whitePieceArray[i].position = [newx, newy]
                            board.blacksTurn = !board.blacksTurn
                            board.selectionMade = false
                            board.lastPiece= "nothing"
                            console.log(`last piece ${lastPiece}`)

                            if(lastPiece != "nothing"){
                                for(let j = 0; j < blackPieceArray.length; j++){
                                    console.log(whitePieceArray[j].piece)
                                    if(blackPieceArray[j].piece == lastPiece){
                                        blackPieceArray[j].isAlive = false
                                        blackPieceArray[j].position = [0, 100] //TO THE SHADOW REALM
                                        break;
                                    }
                                }
                            }

                            break;

                        }

                    }



                }
                



            } else if (events[i].type === "move-left") {
            } 
        }
    }


    return entities;
    
}

export { ChessGameLoop }