import Constants from './Constants';
import GridNode from './GridNode';

function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



export default class Grid {

    constructor() {
        this.x_length = Constants.GRID_SIZE
        this.y_length = Constants.GRID_SIZE
        this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
        this.gridArray = []

    }

    initializeArray(){
        for (let i = 0; i <= this.x_length; i++) {
            var tempArray = []
            for (let j = 0; j <= this.y_length; j++) {
                let a = new GridNode(i, j)
                tempArray.push(a)
                console.log('[' + i + ',' + j + ']');
            }
            this.gridArray.push(tempArray)
        }
    }

    printStuff(){

        console.log("Grid printStuff() method")
        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                console.log(item.xValue, item.yValue);
            });
        });

    }

    changeValues(){

        this.gridArray.forEach((row) => {
            row.forEach((item) => { //Column
                item.xValue = item.xValue + 10
                item.yValue = item.yValue + 10
            });
        });
    }

    checkForPlayer(headX, headY){
        let i = Math.round(headX)
        let j = Math.round(headY)
        this.gridArray[i][j].hasPlayer = true
        console.log(`Position ${[i, j]} has player is ${this.gridArray[i][j].hasPlayer}`)
    }

    }