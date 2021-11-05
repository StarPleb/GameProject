import {Dimensions} from 'react-native';
export default PongConstants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 16,
    SPEED_SCALE: 0.01025641,
    PLAYER_SPEED: 0.4,
    PLAYER_SPEED2: 1/2,
    PLAYER_SPEED3: 1/4,
    BALL_SPEED: 0.4,
    BALL_SPEED2: 1/2,
    BALL_SPEED3: 1/4
}