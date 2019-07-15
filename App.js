import React from 'react';
import {StyleSheet, StatusBar, View, Text, ImageBackground, Dimensions} from 'react-native';
import {EM} from "./engine/EntityManager";
import {GameEngine} from "react-native-game-engine";
import MoveEntities from "./engine/Engines";
import MapHelper from "./renderers/Helper";
import Vector from "./engine/mathyStuff/Vector";

export default function App() {

    const resourcepack = "default";
    const resourcepackPath = "../assets/resourcepacks/";
    const windowWidth = Dimensions.get('window').width;

    let map = {
        "name": "Bloons nostalgia",
        "assets": {
            "image": "bloonsNostalgia.png"
        },
        "size": new Vector(30, 40),
        "comment1": "size im m * m",
        "path": [
            new Vector(16, 0),
            new Vector(16, 11.5),
            new Vector(23.25, 11.5),
            new Vector(23.25, 18),
            new Vector(8.5, 18),
            new Vector(8.5, 9),
            new Vector(3.25, 9),
            new Vector(3.25, 31.25),
            new Vector(11, 31.25),
            new Vector(11, 24.5),
            new Vector(18, 24.5),
            new Vector(18, 31.25),
            new Vector(26.25, 31.25),
            new Vector(26.25, 22.5)
        ]
    };

    MapHelper.setMap(map);
    MapHelper.setMapSize(map.size.x, map.size.y);
    MapHelper.setMapViewSize(0,0, windowWidth, windowWidth * 4 / 3);

    return (
        <View
            style={styles.container}>

            <ImageBackground style={{height: windowWidth * 4 / 3, width: windowWidth, top: 0}}
                             source={require("./assets/resourcepacks/default/images/maps/bloonsNostalgia.png")}>
                <GameEngine
                    style={[styles.engine]}
                    systems={[MoveEntities]}
                    entities={EM.getEntities()}
                >
                    <StatusBar hidden={true}/>

                </GameEngine>
            </ImageBackground>

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
        justifyContent: 'space-between'
    },
    engine: {},
    menu: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0000ff',
        zIndex: 100,
        bottom: 0,
    }
});
