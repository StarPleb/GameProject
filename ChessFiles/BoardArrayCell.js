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


export default class BoardArrayCell {

    constructor(xInput, yInput) {
        this.xValue = xInput
        this.yValue = yInput
        this.position=[xInput, yInput]
        this.piece = "nothing"
        this.getPieceName(xInput, yInput)
        this.isBlack = false
        this.isWhite = false
        this.isAlive = true
        this.hasMoved = false

        this.getPieceName(xInput, yInput)

    }

    getPosition(){
        return this.position
    }

    getPieceName(x, y){

        xValue = x
        yValue = y
    
        if(xValue == 0 && yValue == 0){
            this.piece = "a8rook"
            this.isBlack = true
        }
        else if(xValue == 1 && yValue == 0){
            this.piece = "b8knight"
            this.isBlack = true
    
        }
        else if(xValue == 2 && yValue == 0){
            this.piece = "c8bishop"
            this.isBlack = true
    
        }
        else if(xValue == 3 && yValue == 0){
            this.piece = "d8queen"
            this.isBlack = true
    
        }
        else if(xValue == 4 && yValue == 0){
            this.piece = "e8king"
            this.isBlack = true
    
        }
        else if(xValue == 5 && yValue == 0){
            this.piece = "f8bishop"
            this.isBlack = true
    
        }
        else if(xValue == 6 && yValue == 0){
            this.piece = "g8knight"
            this.isBlack = true
    
        }
        else if(xValue == 7 && yValue == 0){
            this.piece = "h8rook"
            this.isBlack = true
    
        }
        else if(xValue == 0 && yValue == 1){
            this.piece = "a7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 1 && yValue == 1){
            this.piece = "b7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 2 && yValue == 1){
            this.piece = "c7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 3 && yValue == 1){
            this.piece = "d7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 4 && yValue == 1){
            this.piece = "e7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 5 && yValue == 1){
            this.piece = "f7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 6 && yValue == 1){
            this.piece = "g7pawn"
            this.isBlack = true
    
        }
        else if(xValue == 7 && yValue == 1){
            this.piece = "h7pawn"
            this.isBlack = true
    
        }
    
        else if(xValue == 0 && yValue == 7){
            this.piece = "a1rook"
            this.isWhite = true
    
        }
        else if(xValue == 1 && yValue == 7){
            this.piece = "b1night"
            this.isWhite = true
        }
        else if(xValue == 2 && yValue == 7){
            this.piece = "c1bishop"
            this.isWhite = true
        }
        else if(xValue == 3 && yValue == 7){
            this.piece = "d1queen"
            this.isWhite = true
        }
        else if(xValue == 4 && yValue == 7){
            this.piece = "e1king"
            this.isWhite = true
        }
        else if(xValue == 5 && yValue == 7){
            this.piece = "f1bishop"
            this.isWhite = true
        }
        else if(xValue == 6 && yValue == 7){
            this.piece = "g1knight"
            this.isWhite = true
        }
        else if(xValue == 7 && yValue == 7){
            this.piece = "h1rook"
            this.isWhite = true
        }
        else if(xValue == 0 && yValue == 6){
            this.piece = "a2pawn"
            this.isWhite = true
        }
        else if(xValue == 1 && yValue == 6){
            this.piece = "b2pawn"
            this.isWhite = true
        }
        else if(xValue == 2 && yValue == 6){
            this.piece = "c2pawn"
            this.isWhite = true
        }
        else if(xValue == 3 && yValue == 6){
            this.piece = "d2pawn"
            this.isWhite = true
        }
        else if(xValue == 4 && yValue == 6){
            this.piece = "e2pawn"
            this.isWhite = true
        }
        else if(xValue == 5 && yValue == 6){
            this.piece = "f2pawn"
            this.isWhite = true
        }
        else if(xValue == 6 && yValue == 6){
            this.piece = "g2pawn"
            this.isWhite = true
        }
        else if(xValue == 7 && yValue == 6){
            this.piece = "h2pawn"
            this.isWhite = true
        }
        else{
            this.piece="nothing"
        }
    
    };




}