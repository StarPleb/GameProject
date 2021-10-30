import {Dimensions} from 'react-native';
export default PongConstants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 16,
    SPEED_SCALE: 0.01025641,
    PLAYER_SPEED: 0.4,
    PLAYER_SPEED2: Dimensions.get("window").width * 0.001591,
    BALL_SPEED: 0.4,
    BALL_SPEED2: Dimensions.get("window").width * 0.001591,
}