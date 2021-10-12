import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry, StyleSheet, Text, View, Button, Image, TouchableHighlight, SafeAreaView, ScrollView, useWindowDimensions, Modal, TouchableOpacity, Pressable } from 'react-native';
import Snake from './SnakeFiles/Snake.js'
import { useNavigation } from '@react-navigation/native';



const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <StackedScreen />
  )
}

const StackedScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Snake" component={Snek} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Button
        title="Play Snake"
        onPress={() =>
          navigation.navigate('Snake', { Something: 'icup' })
        }
      />
      <Button
        title="Whatever your heart desires"
        onPress={() =>
          console.log("Unless its money")
        }
      />

    </View>

  );
};




const Snek = () => {
  const navigation = useNavigation();

  return <Snake navigation={navigation} />
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  halfContainer: {
    flex: 0.5,
    backgroundColor: "#F8F0E3",
    justifyContent: 'center',
    alignItems: 'center',
  },
})

AppRegistry.registerComponent("App", () => App);

