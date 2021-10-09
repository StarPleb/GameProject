import React, {Component} from 'react';
import { View } from 'react-native';
import Constants from './Constants';

export default class EnemyTail extends Component{
    constructor(props){
        super(props);
    }

    render() {
        let tailList = this.props.elements.map((el, idx) => {
            return(
                <View key = {idx} style = {{width: this.props.size, height: this.props.size, backgroundColor: '#7B1F7C', position: 'absolute', left: el[0] * this.props.size, top : el[1] * this.props.size}} />
            )
        })

        return(
            <View style = {{position: 'absolute', width: Constants.GRID_SIZE * this.props.size, height: Constants.GRID_SIZE * this.props.size }}>
                {tailList}
            </View>
        )
    }
}