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


export default class BoardCell {

    constructor(xInput, yInput, size, engine) {
        this.size = size,
            this.isDark = isDarkCell(xInput, yInput),
            this.xValue = xInput,
            this.yValue = yInput
            this.piece = ""
            this.engine = engine
    }


}