import Constants from './Constants';
import Grid from './Grid';

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var GridThing = new Grid
GridThing.initializeArray()

const GameLoop = (entities, { touches, dispatch, events }) => {


    let head = entities.head;
    let food = entities.food;
    let tail = entities.tail;
    let enemyHead = entities.enemyHead
    let enemyTail = entities.enemyTail
    let ticker = entities.ticker;
    let ticksToWait = 1 / Constants.SNAKE_SPEED; //The ticks it takes for the snake to move one unit on grid
    let enemyTicksToWait = ticksToWait * 2
    let enemyTicksToWait2 = ticksToWait * 4

    // let enemyTicksToWait = 1 / Constants.ENEMY_SPEED
    let enemyTicker = entities.enemyTicker


    if (events.length) { //Sets move for next 'tick'
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-up") {
                console.log('Going up!');
                head.currentMove = "move-up"
            } else if (events[i].type === "move-down") {
                console.log('Going down!');
                head.currentMove = "move-down"
            } else if (events[i].type === "move-left") {
                console.log('Going left!')
                head.currentMove = "move-left"
            } else if (events[i].type === "move-right") {
                console.log('Going right!')
                head.currentMove = "move-right"
            } else if (events[i].type === "change-shit") {
                GridThing.changeValues()
                GridThing.printStuff()
            }
        }
    }

    if (
        head.position[0] < -0.2 ||
        head.position[0] >= Constants.GRID_SIZE - 0.8 ||
        head.position[1] < -0.2 ||
        head.position[1] >= Constants.GRID_SIZE - 0.8
    ) {
        //Game Over
        console.log(`Game Over!`)
        console.log(`Grid size is: ${Constants.GRID_SIZE}`)
        console.log(`Death location is x:${head.position[0]}, y:${head.position[1]}`)
        dispatch({ type: 'game-over' })

    } else {
        //The player hasn't died
        ticker.tickCount += 1
        enemyTicker.tickCount += 1

        // GridThing.checkForPlayer(head.position[0], head.position[1])


        if (ticker.tickCount == ticksToWait) { //Moves on correct 'tick'
            ticker.tickCount = 0
            ticker.tailSlicing = true

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

       if(Math.abs(head.position[0] - enemyHead.position[0]) < 0.5 && Math.abs(head.position[1] - enemyHead.position[1]) < 0.5){ //Checking for collision with head
        dispatch({ type: "game-over" })
        } else{
            for (let i = 0; i < enemyTail.elements.length; i++) { //Checks for collision with tail
                if (Math.abs(head.position[0] - enemyTail.elements[i][0]) < 0.5 && Math.abs(head.position[1] - enemyTail.elements[i][1]) < 0.5) {
                    dispatch({ type: "game-over" })
                }
            }

        }



        for (let i = 0; i < tail.elements.length; i++) { //Checks for collision with tail
            if (head.position[0] === tail.elements[i][0] && head.position[1] === tail.elements[i][1]) {
                dispatch({ type: "game-over" })
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
            // GridThing.printStuff()

        }


        enemyHead.position[0] += enemyHead.xspeed;
        enemyHead.position[1] += enemyHead.yspeed;

        if(enemyHead.justSpawned){
            enemyTail.elements = [[enemyHead.position[0], enemyHead.position[1]]].concat(enemyTail.elements);

        } else{
            if(enemyTicker.tickCount % 2 === 0){
                enemyTail.elements = [[enemyHead.position[0], enemyHead.position[1]]].concat(enemyTail.elements).slice(0, -1);
            }

        }



        //Enemy movements
        if (!enemyHead.initiated && enemyTicker.tickCount == enemyTicksToWait2) { //Moves on correct 'tick'
            console.log("Enemy initialized!")
            enemyTicker.tickCount = 0
            enemyHead.justSpawned = false
            enemyHead.initiated = true
    
        }

        if(enemyHead.initiated && enemyTicker.tickCount === enemyTicksToWait){
            enemyTicker.tickCount = 0

            let targetX = Math.round(head.position[0])
            let targetY = Math.round(head.position[1])
            let currentX = Math.round(enemyHead.position[0])
            let currentY = Math.round(enemyHead.position[1])

            if (currentY > targetY && enemyHead.lastMove != "move-down") {
                console.log("ENEMY MOVING UP")
                enemyHead.yspeed = -Constants.ENEMY_SPEED;
                enemyHead.xspeed = 0
                enemyHead.lastMove = "move-up"

            } else if (currentY < targetY && enemyHead.lastMove != "move-up") {
                console.log("ENEMY MOVING DOWN")
                enemyHead.yspeed = Constants.ENEMY_SPEED
                enemyHead.xspeed = 0
                enemyHead.lastMove = "move-down"

            }
            
           else if (currentX > targetX && enemyHead.lastMove != "move-right") {
            console.log("ENEMY MOVING LEFT")
                enemyHead.xspeed = -Constants.ENEMY_SPEED;
                enemyHead.yspeed = 0;
                enemyHead.lastMove = "move-left"
            } else if (currentX < targetX && enemyHead.lastMove != "move-left") {
                console.log("ENEMY MOVING RIGHT")
                enemyHead.xspeed = Constants.ENEMY_SPEED;
                enemyHead.yspeed = 0;
                enemyHead.lastMove = "move-right"
            }

        }

        // enemyHead.position[0] += enemyHead.xspeed;
        // enemyHead.position[1] += enemyHead.yspeed;

    
    }


    return entities;
}

export { GameLoop }