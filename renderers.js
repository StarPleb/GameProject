import React, { PureComponent } from "react";
import { useState, Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal } from 'react-native';

 
const RADIUS = 50;
 
class GameThing extends PureComponent{



    render(){

        const x = this.props.xValue
        const y = this.props.yValue


        return(
            <View style = {[{flex: 1,}]}>
            <View style={[styles.finger, { left: x, top: y, backgroundColor: this.props.color}]} />
            <Text style = {[styles.text, {color: "white"}]}>
                {this.props.name}
            </Text>

        </View>
        )

    };
};


class Finger extends PureComponent {
    onPress = () => {alert("Ouch!")};


  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;

    return (
        <TouchableHighlight onPress = {this.onPress}>
            <GameThing xValue={x} yValue={y} color = {this.props.color}/>
        </TouchableHighlight>
    );
  }
}
 
const styles = StyleSheet.create({
  finger: {
    borderColor: "black",
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: "#eeeee4",
    position: "absolute"
  },
  text: {
    fontSize: 15,
    flex: 1,
    alignSelf:
      'center',
    color: 'black',
    textAlign: 'center'
  },
});
 
export { Finger };