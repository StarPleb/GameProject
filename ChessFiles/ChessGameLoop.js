import { getNativeSourceFromSource } from 'expo-av/build/AV';
import {Pressable} from 'react-native'



function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sleep(ms) { //Useful for async functions 
    return new Promise(resolve => setTimeout(resolve, ms));
  }


const ChessGameLoop = (entities, { touches, dispatch, events }) => {



    let board = entities.board


    return entities;
    
}

export { ChessGameLoop }