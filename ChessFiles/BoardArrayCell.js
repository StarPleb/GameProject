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

        this.getPieceName(xInput, yInput)

    }

    getPieceName(x, y){

        xValue = x
        yValue = y
    
        if(xValue == 0 && yValue == 0){
            this.piece = "rook"
            this.isBlack = true
        }
        else if(xValue == 1 && yValue == 0){
            this.piece = "knight"
            this.isBlack = true
    
        }
        else if(xValue == 2 && yValue == 0){
            this.piece = "bishop"
            this.isBlack = true
    
        }
        else if(xValue == 3 && yValue == 0){
            this.piece = "queen"
            this.isBlack = true
    
        }
        else if(xValue == 4 && yValue == 0){
            this.piece = "king"
            this.isBlack = true
    
        }
        else if(xValue == 5 && yValue == 0){
            this.piece = "bishop"
            this.isBlack = true
    
        }
        else if(xValue == 6 && yValue == 0){
            this.piece = "knight"
            this.isBlack = true
    
        }
        else if(xValue == 7 && yValue == 0){
            this.piece = "rook"
            this.isBlack = true
    
        }
        else if(xValue == 0 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 1 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 2 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 3 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 4 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 5 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 6 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
        else if(xValue == 7 && yValue == 1){
            this.piece = "pawn"
            this.isBlack = true
    
        }
    
        else if(xValue == 0 && yValue == 7){
            this.piece = "rook"
            this.isWhite = true
    
        }
        else if(xValue == 1 && yValue == 7){
            this.piece = "knight"
            this.isWhite = true
        }
        else if(xValue == 2 && yValue == 7){
            this.piece = "bishop"
            this.isWhite = true
        }
        else if(xValue == 3 && yValue == 7){
            this.piece = "queen"
            this.isWhite = true
        }
        else if(xValue == 4 && yValue == 7){
            this.piece = "king"
            this.isWhite = true
        }
        else if(xValue == 5 && yValue == 7){
            this.piece = "bishop"
            this.isWhite = true
        }
        else if(xValue == 6 && yValue == 7){
            this.piece = "knight"
            this.isWhite = true
        }
        else if(xValue == 7 && yValue == 7){
            this.piece = "rook"
            this.isWhite = true
        }
        else if(xValue == 0 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 1 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 2 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 3 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 4 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 5 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 6 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
        else if(xValue == 7 && yValue == 6){
            this.piece = "pawn"
            this.isWhite = true
        }
    
    };




}