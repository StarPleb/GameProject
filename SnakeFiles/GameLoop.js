import Constants from './Constants';

function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const GameLoop = (entities, { touches, dispatch, events }) => {

    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;
    let ticker = entities.ticker;
    let ticksToWait = 1 / Constants.SNAKE_SPEED; //The ticks it takes for the snake to move one unit on grid
    console.log(`ticks to wait is ${ticksToWait}`);



    if (events.length) { //Sets move for next 'tick'
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-up") {
                console.log('Going up!"');
                head.currentMove = "move-up"
            } else if (events[i].type === "move-down") {
                console.log('Going down!"');
                head.currentMove = "move-down"
            } else if (events[i].type === "move-left") {
                console.log('Going left!"')
                head.currentMove = "move-left"
            } else if (events[i].type === "move-right") {
                console.log('Going right!"')
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
        //The player hasn't died
        ticker.tickCount += 1


        if (ticker.tickCount == ticksToWait) { //Moves on correct 'tick'
            ticker.tailSlicing = true,
            ticker.tickCount = 0

            if (head.currentMove === "move-up" && head.yspeed !== Constants.SNAKE_SPEED && !head.hasMoved) {
                head.yspeed = -Constants.SNAKE_SPEED;
                head.xspeed = 0
                head.hasMoved = true

            } if (head.currentMove === "move-down" && head.yspeed !== -Constants.SNAKE_SPEED && !head.hasMoved) {
                head.yspeed = Constants.SNAKE_SPEED
                head.xspeed = 0
                head.hasMoved = true
            } if (head.currentMove === "move-left" && head.xspeed !== Constants.SNAKE_SPEED && !head.hasMoved) {
                head.xspeed = -Constants.SNAKE_SPEED;
                head.yspeed = 0;
                head.hasMoved = true
            } if (head.currentMove === "move-right" && head.xspeed !== -Constants.SNAKE_SPEED && !head.hasMoved) {
                head.xspeed = Constants.SNAKE_SPEED;
                head.yspeed = 0;
                head.hasMoved = true


            }
   
        } else { //In between ticks
            head.hasMoved = false
        }

        head.position[0] += head.xspeed;
        head.position[1] += head.yspeed;
        

        for(let i =0; i < tail.elements.length; i++){ //Checks for collision with tail
            if(head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]){
                dispatch({type: "game-over"})
            }
        }



        if (ticker.tailSlicing) {
            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements).slice(0, -1);

        } else {
            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements);

        }

        if (Math.abs(head.position[0] - food.position[0]) < 0.5 && Math.abs(head.position[1] - food.position[1]) < 0.5) {

            //Snek eats fruit
            console.log(`YUMMY`)
            console.log(`head position: ${head.position[0]}, ${head.position[1]}`)
            console.log(`food position: ${food.position[0]}, ${food.position[1]}`)
            dispatch({ type: "collision" })

            tail.elements = [[head.position[0], head.position[1]]].concat(tail.elements);
            ticker.tailSlicing = false
            food.position[0] = randomBetween(2, Constants.GRID_SIZE - 2);
            food.position[1] = randomBetween(2, Constants.GRID_SIZE - 2);
        }
    }
    return entities;
}

export { GameLoop }