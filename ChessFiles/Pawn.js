import React, {Component} from 'react';
import { View, Image} from 'react-native';

const pictures = [
    {
      id: '001',
      image: require('./chessPieces/black-pawn.png'),
    },
    {
        id: '001',
        image: require('./chessPieces/white-pawn.png'),
    },
]

export default class Pawn extends Component{
    constructor(props){
        super(props);
        this.size = props.CELL_SIZE
        this.isBlack = props.isBlack
        this.isAlive = props.isAlive
        this.isSelected = props.isSelected
        this.color = ""

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



        return(

            <View style={{ width: this.size, height: this.size, position: 'absolute', left: x * this.size, top: y * this.size, backgroundColor: this.props.isAlive ? null : "red", justifyContent: 'flex-end' }}>
            <Image source={this.imageSource()}
                style={{ resizeMode: 'contain', alignSelf: 'center', width: this.size * 0.75, height: this.size * 0.75 }} />
        </View>
        )
    }
}