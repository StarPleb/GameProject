import React, {Component, PureComponent} from 'react';
import Constants from './Constants';
import { AppRegistry, StyleSheet, Pressable, TouchableHighlight, TouchableOpacity, Text, View, Dimensions, Alert } from 'react-native';



export default class GridNode {

    constructor(xInput, yInput){
        this.hasPlayer = false,
        this.hasEnemy = false,
        this.size = Constants.CELL_SIZE,
        this.xValue = xInput,
        this.yValue = yInput
    }


}