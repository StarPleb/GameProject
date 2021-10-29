import {Dimensions} from 'react-native';
export default PongConstants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 16,
    PLAYER_SPEED: 0.4,
    BALL_SPEED: 0.4
}