import React, {Component} from 'react';
import { View, Image } from 'react-native';

export default class King extends Component{
    constructor(props){
        super(props);
        this.size = props.CELL_SIZE
        this.isBlack = props.isBlack
    }

    render() {

        const x = this.props.position[0];
        const y = this.props.position[1];

        return(

            <View style={{ width: this.size, height: this.size, position: 'absolute', left: x * this.size, top: y * this.size, backgroundColor: null, justifyContent: 'flex-end' }}>
            <Image source={require('./chessPieces/king.png')}
                style={{ resizeMode: 'contain', alignSelf: 'center', width: this.size * 0.75, height: this.size * 0.75, tintColor: this.isBlack ? "black" : "white" }} />
        </View>
        )
    }
}