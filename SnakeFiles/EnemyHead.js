import React, {Component} from 'react';
import { View } from 'react-native';

function randomBetween (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export default class EnemyHead extends Component{
    constructor(props){
        super(props);
        this.alive = true
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return(

            <View style = {{width: this.props.size, 
                height: this.props.size,
                backgroundColor: '#7B1F7C', 
                position: 'absolute', 
                left: x * this.props.size, 
                top: y*this.props.size}}/>
        )
        
    }
}