import {Pressable} from 'react-native'
import Constants from '../SnakeFiles/Constants.js';
import PongConstants from './PongConstants.js';



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const PongGameLoop = (entities, { touches, dispatch, events }) => {



    let paddle = entities.player1
    let enemyPaddle = entities.player2
    let AIPaddle = entities.AI
    let ball = entities.ball

    const xBoundary = paddle.gridWidth - 1
    const xLowerBoundary = 0
    const yBoundary = paddle.gridHeight - 1
    const easyDistance = yBoundary/10
    const mediumDistance = yBoundary/4
    const impossibleDistance = yBoundary/6
    // console.log(`${PongConstants.BALL_SPEED2} and ${PongConstants.PLAYER_SPEED2}`)
    


    var ballOut;

    if(ball.position[1] > paddle.position[1]){
        ballOut = true
    } else if(AIPaddle.isPlaying && ball.position[1] < AIPaddle.position[1]){
        ballOut = true
    } else if(!AIPaddle.isPlaying && ball.position[1] < enemyPaddle.position[1]){
        ballOut = true
    } else{
        ballOut = false
    }


    if (events.length) { //Sets move for next 'tick'
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-right") {
                paddle.xspeed = PongConstants.PLAYER_SPEED2
            } else if (events[i].type === "move-left") {
                paddle.xspeed = -PongConstants.PLAYER_SPEED2
            } else if (events[i].type === "stop-moving") {
                paddle.xspeed = 0
            } else if (events[i].type === "enemy-stop-moving") {
                console.log(`enemy stop moving`)
                if(AIPaddle.isPlaying){
                    AIPaddle.xspeed = 0
                } else{
                    enemyPaddle.xspeed = 0
                }
            } else if (events[i].type === "enemy-move-left") {
                console.log(`enemy move left`)
                if(AIPaddle.isPlaying){
                    AIPaddle.xspeed = -PongConstants.PLAYER_SPEED2
                } else{
                    enemyPaddle.xspeed = -PongConstants.PLAYER_SPEED2
                }
            } else if (events[i].type === "enemy-move-right") {
                console.log(`enemy move right`)
                if(AIPaddle.isPlaying){
                    AIPaddle.xspeed = PongConstants.PLAYER_SPEED2
                } else{
                    enemyPaddle.xspeed = PongConstants.PLAYER_SPEED2
                }
            } else if (events[i].type === "p1score") {
                console.log(`p1 score event`)
                ball.xspeed = 0
                ball.yspeed = 0
                paddle.isServing = true
                ball.position[0] = paddle.position[0] + 2
                ball.position[1] = paddle.position[1] - 1

            } else if (events[i].type === "p2score") {
                console.log(`p2score event`)
                ball.xspeed = 0
                ball.yspeed = 0
                if(AIPaddle.isPlaying){
                    AIPaddle.isServing = true
                    ball.position[0] = AIPaddle.position[0] + 2
                    ball.position[1] = AIPaddle.position[1] + 1
                    AIPaddle.tick = 0
    
                } else{
                    enemyPaddle.isServing = true
                    ball.position[0] = enemyPaddle.position[0] + 2
                    ball.position[1] = enemyPaddle.position[1] + 1
    
                }
            }  else if (events[i].type === "p1serve" && paddle.isServing) {
                console.log(`p1 serve`)
                ball.xspeed = PongConstants.BALL_SPEED2
                ball.yspeed = -PongConstants.BALL_SPEED2
                paddle.isServing = false
            }  else if (events[i].type === "p2serve" && (enemyPaddle.isServing || AIPaddle.isServing)) {
                console.log(`p2 serve`)
                ball.xspeed = PongConstants.BALL_SPEED2
                ball.yspeed = PongConstants.BALL_SPEED2
                if(AIPaddle.isPlaying){
                    AIPaddle.isServing = false
                } else{
                    enemyPaddle.isServing = false
                }
            }  else if (events[i].type === "collision") {
                AIPaddle.rando = randomBetween(0, 100)
            }
        }
    }

    if((ball.position[0] >= xBoundary || ball.position[0] <= xLowerBoundary) ){
        ball.xspeed = -ball.xspeed
        dispatch({ type: "collision" })
    }


    if(paddle.isServing){
        ball.position[0] = paddle.position[0] + 2
        ball.position[1] = paddle.position[1] - 1
    } else if(enemyPaddle.isServing){
        ball.position[0] = enemyPaddle.position[0] + 2
        ball.position[1] = enemyPaddle.position[1] + 1
    } else if(AIPaddle.isServing){
        ball.position[0] = AIPaddle.position[0] + 2
        ball.position[1] = AIPaddle.position[1] + 1
    }


    //Ball passes Player 2's defense
    if(ball.position[1] <= 0){
        ball.yspeed = -ball.yspeed
        dispatch({ type: "collision" })
        dispatch({ type: "p1score"})
    }

    //Ball passes Player 1's defense
    if(ball.position[1] >= yBoundary){
        ball.yspeed = -ball.yspeed
        dispatch({ type: "collision" })
        dispatch({ type: "p2score"})
    }


    //Player1 movement
    if(paddle.position[0] + paddle.xspeed > xLowerBoundary && paddle.position[0] + paddle.xspeed < xBoundary - 2){
        paddle.position[0] += paddle.xspeed

    }

    //Player2 movement
    if(enemyPaddle.position[0] + enemyPaddle.xspeed > xLowerBoundary && enemyPaddle.position[0] + enemyPaddle.xspeed < xBoundary - 2 ){
        enemyPaddle.position[0] += enemyPaddle.xspeed
    }


    //Ball collided with player1
    if(Math.abs((paddle.position[0] + 1) - ball.position[0]) < 2){
        if(Math.abs(ball.position[1] - paddle.position[1]) < 1 && !ballOut){
            ball.position[1] -= ball.yspeed

            ball.yspeed = -ball.yspeed
            console.log(`COLLISION`)
            
            paddle.lastHit = true
            enemyPaddle.lastHit = false
            dispatch({ type: "collision" })
        }
    }

    //Ball collided with player 2
    if(Math.abs((enemyPaddle.position[0] + 1) - ball.position[0]) < 2){
        if(Math.abs(ball.position[1] - enemyPaddle.position[1]) < 1 && !ballOut){
            ball.position[1] -= ball.yspeed
            ball.yspeed = -ball.yspeed
            enemyPaddle.lastHit = true
            paddle.lastHit = false
            dispatch({ type: "collision" })
        }
    }



    //Normal movement for ball most of time, checks for boundaries when serving
    if(!paddle.isServing && !enemyPaddle.isServing || !paddle.isServing && !AIPaddle.isServing){
        ball.position[0] += ball.xspeed;
        ball.position[1] += ball.yspeed;
    
    } else if(paddle.isServing || enemyPaddle.isServing) {

        if(ball.position[0] + ball.xspeed > xLowerBoundary && ball.position[0] + ball.xspeed < xBoundary - 2 ){
        ball.position[0] += ball.xspeed;
        ball.position[1] += ball.yspeed;

        }
    }

    //Ai time
    if(AIPaddle.isPlaying){
        enemyPaddle.position[0] = 100 //TO THE
        enemyPaddle.position[1] = 200 //SHADOW REALM
        if(AIPaddle.position[0] < ball.position[0]){
            AIPaddle.xspeed = PongConstants.PLAYER_SPEED2
        } else if(AIPaddle.position[0] > ball.position[0]){
            AIPaddle.xspeed = -PongConstants.PLAYER_SPEED2
        }



        //Only moves if ball is in range
        if(Math.abs(AIPaddle.position[1] - ball.position[1]) < mediumDistance && !AIPaddle.isServing){
            if(ball.yspeed < 0 && (AIPaddle.position[0] + AIPaddle.xspeed > xLowerBoundary && AIPaddle.position[0] + AIPaddle.xspeed < xBoundary - 2)){
                AIPaddle.position[0] += AIPaddle.xspeed
            }
        }

        //Collision with ball
        if(Math.abs((AIPaddle.position[0] + 1) - ball.position[0]) < 2){
            if(Math.abs(ball.position[1] - AIPaddle.position[1]) < 1 && !ballOut){
                ball.position[1] -= ball.yspeed
                ball.yspeed = -ball.yspeed
                AIPaddle.lastHit = true
                paddle.lastHit = false
                dispatch({ type: "collision" })
            }
        }

        //AIPaddle is serving
        if(AIPaddle.tick <= AIPaddle.tickCount){

            if(AIPaddle.rando <= 50){

                if(AIPaddle.position[0] + PongConstants.PLAYER_SPEED2 < xBoundary - 2){
                    AIPaddle.position[0] += PongConstants.PLAYER_SPEED2
                    ball.position[0] += PongConstants.PLAYER_SPEED2
                }
            } else {

                if(AIPaddle.position[0] - PongConstants.PLAYER_SPEED2 > xLowerBoundary){
                    AIPaddle.position[0] += -PongConstants.PLAYER_SPEED2
                    ball.position[0] += -PongConstants.PLAYER_SPEED2
                }
            }
            AIPaddle.tick += 1
            if(AIPaddle.tick === AIPaddle.tickCount){
                dispatch({ type: "p2serve" })

            }
        }
        
    } else{
        AIPaddle.position[0] = 100//TO THE
        AIPaddle.position[1] = 200//SHADOW REALM
    }




    return entities;
}

export { PongGameLoop }