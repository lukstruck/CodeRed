import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entity from "./Entity";
import MapHelper from "./Helper";

const HEIGHT = 20;
const WIDTH = 20;

export default class Zombie extends Entity {

    render() {
        return (
            <View style={[styles.turret, { left: this.props.position.x * this.ratio.x - WIDTH / 2, top: this.props.position.y * this.ratio.y - HEIGHT / 2 }]} />
        );
    }
}

const styles = StyleSheet.create({
    turret: {
        backgroundColor: '#ff0000',
        height: HEIGHT,
        width: WIDTH,
        zIndex: 20,
        position: 'absolute',
    },
});
