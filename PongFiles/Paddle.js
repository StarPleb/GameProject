import React, {Component} from 'react';
import { View } from 'react-native';

export default class Paddle extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return(

            <View style = {{width: this.props.width, 
                height: this.props.height,
                backgroundColor: 'white', 
                position: 'absolute', 
                left: x * this.props.width/3, 
                top: y*this.props.height}}/>
        )
    }
}