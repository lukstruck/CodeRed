import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entity from "./Entity";

const HEIGHT = 20;
const WIDTH = 20;

export default class Turret extends Entity {

    render() {
        return (
            <View style={[styles.turret, { left: this.x, top: this.y }]} />
        );
    }
}

const styles = StyleSheet.create({
    turret: {
        backgroundColor: '#00ff00',
        height: HEIGHT,
        width: WIDTH,
        zIndex: 10,
        position: 'relative',
    },
});
