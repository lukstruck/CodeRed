import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import DatapackListScreen from "./screens/DatapackListScreen";
import GameScreen from "./screens/GameScreen";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    DatapackList: {
        screen: DatapackListScreen
    },
    Game: {
        screen: GameScreen
    },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);

