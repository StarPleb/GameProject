import {Dimensions} from 'react-native';
export default Constants = {
    MAX_WIDTH: Dimensions.get("screen").width,
    MAX_HEIGHT: Dimensions.get("screen").height,
    GRID_SIZE: 16,
    CELL_SIZE: 20,
    SNAKE_SPEED: 0.05,
    ENEMY_SPEED: 0.025
}