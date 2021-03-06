import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import ResourcepackListScreen from "./screens/ResourcepackListScreen";
import GameScreen from "./screens/GameScreen";
import AddResourcePackScreen from "./screens/AddResourcePackScreen";
import MapChooseScreen from "./screens/MapChooseScreen";
import ModeChooseScreen from "./screens/ModeChooseScreen";

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    ResourcepackList: {
        screen: ResourcepackListScreen
    },
    Game: {
        screen: GameScreen
    },
    AddResourcePack: {
        screen: AddResourcePackScreen
    },
    MapChooser: {
        screen: MapChooseScreen
    },
    ModeChooser: {
        screen: ModeChooseScreen
    },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);

