import React from 'react';
import {StyleSheet, StatusBar, View, Text} from 'react-native';
import {EM} from "./engine/EntityManager";
import {GameEngine} from "react-native-game-engine";
import MoveEntities from "./engine/Engines";

export default function App() {
    let bgColor = '#fff4b0';
    return (
        <View
            style={styles.container}>

            <GameEngine
                style={[styles.engine, {backgroundColor: bgColor}]}
                systems={[MoveEntities]}
                entities={EM.getEntities()}
                >

                <StatusBar hidden={true}/>

            </GameEngine>

            <View
                style={styles.menu}>
                <Text>Menu</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    engine: {
        height: '70%',
        width: '100%'
    },
    menu: {
        height: '30%',
        width: '100%',
        backgroundColor: '#0000ff',
        zIndex: 100,
    }
});
