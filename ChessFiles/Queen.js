import React, {Component} from 'react';
import { View, Image } from 'react-native';


const pictures = [
    {
      id: '001',
      image: require('./chessPieces/black-queen.png'),
    },
    {
        id: '001',
        image: require('./chessPieces/white-queen.png'),
    },
]
export default class Queen extends Component{
    constructor(props){
        super(props);
        this.size = props.CELL_SIZE
        this.isBlack = props.isBlack
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

            <View style={{ width: this.size, height: this.size, position: 'absolute', left: x * this.size, top: y * this.size, backgroundColor: null, justifyContent: 'flex-end' }}>
            <Image source={this.imageSource()}
                style={{ resizeMode: 'contain', alignSelf: 'center', width: this.size * 0.9, height: this.size * 0.9, }} />
        </View>
        )
    }
}