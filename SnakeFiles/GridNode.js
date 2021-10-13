import Constants from './Constants';


export default class GridNode {

    constructor(xInput, yInput){
        this.hasPlayer = false,
        this.hasEnemy = false,
        this.size = Constants.CELL_SIZE,
        this.xValue = xInput,
        this.yValue = yInput
    }


}