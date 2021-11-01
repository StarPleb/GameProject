import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class MyTimer extends Component{
    constructor(props){
        super(props);
        
    }

    render() {

        const x = this.props.position[0];
        const y = this.props.position[1];
        const count = this.props.tick
        const count2 = this.props.tick2
        const count3 = this.props.tick3
        

        return(

            <Text style = {{width: this.props.width, 
                height: this.props.height,
                color: 'white', 
                fontSize: 15,
                position: 'absolute', 
                left: x * this.props.width, 
                top: y * this.props.height}}>
                    {count} {count2} {count3}
            </Text>
        )
    }

    isThing = () => {

    }
}