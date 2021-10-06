import { TimePickerAndroid } from 'react-native';
import Constants from './Constants';

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function canMove(tickCount, ticksToWait) {


    if (tickCount === ticksToWait) {
        return true
    }
    else {
        return false
    }

}


const GameLoop = (entities, { touches, dispatch, events }) => {

    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;
    let ticker = entities.ticker;
    let ticksToWait = 1 / Constants.SNAKE_SPEED;



    if (events.length) {

        for (let i = 0; i < events.length; i++) {

            if (events[i].type === "move-up") {
                head.currentMove = "move-up"

            } else if (events[i].type === "move-down") {
                console.log('Im down!"');
                console.log(`${head.position}`);
                head.currentMove = "move-down"


            } else if (events[i].type === "move-left") {
                console.log('Im left!"')
                console.log(`${head.position}`);
                head.currentMove = "move-left"

            } else if (events[i].type === "move-right") {
                console.log('Im right!"')
                console.log(`${head.position}`);
                head.currentMove = "move-right"

            }


        }


    }


    if (
        head.position[0] + head.xspeed < 0 ||
        head.position[0] + head.xspeed >= Constants.GRID_SIZE - 1 ||
        head.position[1] + head.yspeed < 0 ||
        head.position[1] + head.yspeed >= Constants.GRID_SIZE - 1
    ) {

        //Game Over

        console.log(`Game Over!`)
        console.log(`${Constants.GRID_SIZE}`)
        console.log(`location is ${head.position[0]}`)
        dispatch({ type: 'game-over' })

    } else {
        ticker.tickCount += 1


        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;


        for(let i =0; i < tail.elements.length; i++){
            if(head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]){
                dispatch({type: "game-over"})
            }
        }

        if (ticker.tickCount == ticksToWait) {
            ticker.tailSlicing = true,
                ticker.tickerRunning = false
            ticker.tickCount = 0
            console.log(`tickCount = ${ticker.tickCount} and ticksToWait = ${ticksToWait}`)



            if (head.currentMove === "move-up" && head.yspeed !== Constants.SNAKE_SPEED && !head.hasMoved) {
                console.log('Im up!"')
                head.yspeed = -Constants.SNAKE_SPEED;
                head.xspeed = 0
                head.hasMoved = true

            } if (head.currentMove === "move-down" && head.yspeed !== -Constants.SNAKE_SPEED && !head.hasMoved) {
                console.log('Im down!"');
                console.log(`${head.position}`);

                head.yspeed = Constants.SNAKE_SPEED
                head.xspeed = 0
                head.hasMoved = true


            } if (head.currentMove === "move-left" && head.xspeed !== Constants.SNAKE_SPEED && !head.hasMoved) {
                console.log('Im left in loop!"')
                console.log(`${head.position}`);


                head.xspeed = -Constants.SNAKE_SPEED;
                head.yspeed = 0;
                head.hasMoved = true


            } if (head.currentMove === "move-right" && head.xspeed !== -Constants.SNAKE_SPEED && !head.hasMoved) {
                console.log('Im right in loop!"')
                console.log(`${head.position}`);
                head.xspeed = Constants.SNAKE_SPEED;
                head.yspeed = 0;
                head.hasMoved = true

            }

        } else {
            head.hasMoved = false
        }


        if (ticker.tailSlicing) {
            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements).slice(0, -1);

        } else {
            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements);

        }





        if (Math.abs(head.position[0] - food.position[0]) < 0.5 && Math.abs(head.position[1] - food.position[1]) < 0.5) {

            console.log(`COLLIDED`)
            console.log(`head position: ${head.position[0]}, ${head.position[1]}`)
            console.log(`food position: ${food.position[0]}, ${food.position[1]}`)
            console.log(`tail element positions: ${tail.elements}`)


            dispatch({ type: "collision" })

            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements);
            ticker.tailSlicing = false
            ticker.tickerRunning = true


            food.position[0] = randomBetween(2, Constants.GRID_SIZE - 3);
            food.position[1] = randomBetween(2, Constants.GRID_SIZE - 3);
        }





    }


    return entities;

}

export { GameLoop }