import React, {Component} from 'react';
import { View, Image} from 'react-native';

export default class SelectedSquare extends Component{
    constructor(props){
        super(props);
        this.size = props.CELL_SIZE


    }

    imageSource() {
        if(this.isBlack){
            return pictures[0].image
        } else{
            return pictures[1].image
        }
    }

    render() {


        const x = this.props.position[0];
        const y = this.props.position[1];
        const size = this.size



        return(

            <View style={{ width: size, height: size, position: 'absolute', left: x * size, top: y * size, backgroundColor: "rgba(62, 129, 237, 1)" }} />

        )
    }
}