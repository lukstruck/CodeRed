import React, {Component} from 'react';
import {StyleSheet, StatusBar, View, Text, ImageBackground, Dimensions} from 'react-native';
import {EM} from "../engine/EntityManager";
import {GameEngine} from "react-native-game-engine";
import MoveEntities from "../engine/Engines";
import MapHelper from "../renderers/Helper";
import Vector from "../engine/mathyStuff/Vector";
import Version from "../storage/Version";
import Storage from "../storage/Storage";
import {NavigationEvents} from "react-navigation";

export default class GameScreen extends Component {

    state = {
        running: false
    };

    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    componentDidMount(): void {

        (async () => {
            let lastVersion = await Storage.getLastUsedVersion();
            let currentVersion = Version.getVersion();
            if (lastVersion !== currentVersion) {
                console.log("[app.js] version changed from " + lastVersion + " to " + currentVersion);
                Storage.setCurrentUsedVersion(currentVersion);
            }
            this.props.navigation.getParam('mode');
            this.props.navigation.getParam('map');
            this.setState({running: true});
        })();
    }

    pauseGame() {
        // TODO Pause overlay
        this.setState({running: false});
    }

    render() {

        const windowWidth = Dimensions.get('window').width;

        let map = {
            "name": "Bloons nostalgia",
            "assets": {
                "image": "bloonsNostalgia.png"
            },
            "size": new Vector(30, 40),
            "comment1": "size im m * m",
            "path": [
                new Vector(16, -1),
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
                new Vector(26.25, 22.5),
                new Vector(31, 22.5),
            ]
        };

        MapHelper.setMap(map);
        MapHelper.setMapSize(map.size.x, map.size.y);
        MapHelper.setMapViewSize(0, 0, windowWidth, windowWidth * 4 / 3);

        return (
            <View
                style={styles.container}>

                <NavigationEvents
                    onWillUnFocus={() => this.pauseGame()}
                />

                <ImageBackground style={{height: windowWidth * 4 / 3, width: windowWidth, top: 0}}
                                 source={require("../assets/tmp/bloonsNostalgia.png")}>
                    <GameEngine
                        systems={[MoveEntities]}
                        entities={EM.getEntities()}
                        running={this.state.running}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    menu: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0000ff',
        zIndex: 100,
        bottom: 0,
    }
});
