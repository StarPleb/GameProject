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

    const xBoundary = paddle.gridWidth
    const yBoundary = paddle.gridHeight


    if (events.length) { //Sets move for next 'tick'
        for (let i = 0; i < events.length; i++) {
            if (events[i].type === "move-right") {
                paddle.xspeed = PongConstants.PLAYER_SPEED
                if(paddle.isServing){
                    ball.xspeed = paddle.xspeed
                }
            } else if (events[i].type === "move-left") {
                paddle.xspeed = -PongConstants.PLAYER_SPEED
                if(paddle.isServing){
                    ball.xspeed = paddle.xspeed
                }
            } else if (events[i].type === "stop-moving") {
                paddle.xspeed = 0
                if(paddle.isServing){
                    ball.xspeed = paddle.xspeed
                }
            } else if (events[i].type === "enemy-stop-moving") {

                if(AIPaddle.isPlaying){

                    AIPaddle.xspeed = 0
                    if(AIPaddle.isServing){
                        ball.xspeed = AIPaddle.xspeed
                    }

                } else{
                    enemyPaddle.xspeed = 0
                    if(enemyPaddle.isServing){
                        ball.xspeed = enemyPaddle.xspeed
                    }
                }
                
            } else if (events[i].type === "enemy-move-left") {
                if(AIPaddle.isPlaying){

                    AIPaddle.xspeed = -PongConstants.PLAYER_SPEED
                    if(AIPaddle.isServing){
                        ball.xspeed = AIPaddle.xspeed
                    }

                } else{
                    enemyPaddle.xspeed = -PongConstants.PLAYER_SPEED
                    if(enemyPaddle.isServing){
                        ball.xspeed = enemyPaddle.xspeed
                    }
                }

            } else if (events[i].type === "enemy-move-right") {
                if(AIPaddle.isPlaying){

                    AIPaddle.xspeed = PongConstants.PLAYER_SPEED
                    if(AIPaddle.isServing){
                        ball.xspeed = AIPaddle.xspeed
                    }

                } else{
                    enemyPaddle.xspeed = PongConstants.PLAYER_SPEED
                    if(enemyPaddle.isServing){
                        ball.xspeed = enemyPaddle.xspeed
                    }
                }
                
            } else if (events[i].type === "p1score") {
                ball.xspeed = 0
                ball.yspeed = 0
                paddle.isServing = true
                ball.position[0] = paddle.position[0] + 2
                ball.position[1] = paddle.position[1] - 1

            } else if (events[i].type === "p2score") {
                ball.xspeed = 0
                ball.yspeed = 0
                enemyPaddle.isServing = true
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
                ball.xspeed = PongConstants.BALL_SPEED
                ball.yspeed = -PongConstants.BALL_SPEED
                paddle.isServing = false
            }  else if (events[i].type === "p2serve" && enemyPaddle.isServing || events[i].type === "p2serve" && AIPaddle.isServing ) {
                ball.xspeed = PongConstants.BALL_SPEED
                ball.yspeed = PongConstants.BALL_SPEED
                enemyPaddle.isServing = false

                if(AIPaddle.isPlaying){
                    AIPaddle.isServing = false
                }
            }  else if (events[i].type === "collision") {
                AIPaddle.rando = randomBetween(0, 100)
            }
        }
    }

    if(ball.position[0] >= xBoundary || ball.position[0] <= 0){
        ball.xspeed = -ball.xspeed
        dispatch({ type: "collision" })
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
    if(paddle.position[0] + paddle.xspeed > 0 && paddle.position[0] + paddle.xspeed < xBoundary - 2){
        paddle.position[0] += paddle.xspeed

    }

    //Player2 movement
    if(enemyPaddle.position[0] + enemyPaddle.xspeed > 0 && enemyPaddle.position[0] + enemyPaddle.xspeed < xBoundary - 2 ){
        enemyPaddle.position[0] += enemyPaddle.xspeed
    }


    //Ball collided with player1
    if(Math.abs((paddle.position[0] + 1) - ball.position[0]) < 2){
        if(Math.abs(ball.position[1] - paddle.position[1]) < 1){
            ball.yspeed = -ball.yspeed
            paddle.lastHit = true
            enemyPaddle.lastHit = false
            dispatch({ type: "collision" })
        }
    }

    //Ball collided with player 2
    if(Math.abs((enemyPaddle.position[0] + 1) - ball.position[0]) < 2){
        if(Math.abs(ball.position[1] - enemyPaddle.position[1]) < 1){
            ball.yspeed = -ball.yspeed
            enemyPaddle.lastHit = true
            paddle.lastHit = false
            dispatch({ type: "collision" })
        }
    }


    //Normal movement for ball most of time, checks for boundaries when serving
    if(!paddle.isServing && !enemyPaddle.isServing){
        ball.position[0] += ball.xspeed;
        ball.position[1] += ball.yspeed;
    
    } else if(paddle.isServing || enemyPaddle.isServing) {

        if(ball.position[0] + ball.xspeed > 0 && ball.position[0] + ball.xspeed < 35 - 2 ){
        ball.position[0] += ball.xspeed;
        ball.position[1] += ball.yspeed;

        }
    }

    //Ai time
    if(AIPaddle.isPlaying){
        enemyPaddle.position[0] = 100
        enemyPaddle.position[1] = 200
        if(AIPaddle.position[0] < ball.position[0]){
            AIPaddle.xspeed = PongConstants.PLAYER_SPEED
        } else if(AIPaddle.position[0] > ball.position[0]){
            AIPaddle.xspeed = -PongConstants.PLAYER_SPEED
        }

        if(Math.abs(AIPaddle.position[1] - ball.position[1]) < 10 && !AIPaddle.isServing){
            if(ball.yspeed < 0){
                AIPaddle.position[0] += AIPaddle.xspeed
            }
        }

        if(Math.abs((AIPaddle.position[0] + 1) - ball.position[0]) < 2){
            if(Math.abs(ball.position[1] - AIPaddle.position[1]) < 1){
                ball.yspeed = -ball.yspeed
                AIPaddle.lastHit = true
                paddle.lastHit = false
                dispatch({ type: "collision" })
            }
        }

        //AIPaddle is serving
        if(AIPaddle.tick <= AIPaddle.tickCount){

            if(AIPaddle.rando <= 50){
                AIPaddle.position[0] += PongConstants.PLAYER_SPEED

            } else{
                AIPaddle.position[0] += -PongConstants.PLAYER_SPEED
            }
            AIPaddle.tick += 1
            if(AIPaddle.tick === AIPaddle.tickCount){
                dispatch({ type: "p2serve" })

            }
        }
        
    } else{
        AIPaddle.position[0] = 100
        AIPaddle.position[1] = 200
    }




    return entities;
}

export { PongGameLoop }