import React from 'react';
import {StyleSheet, View} from 'react-native';
import Entity from "./Entity";

const HEIGHT = 20;
const WIDTH = 20;

export default class Zombie extends Entity {

    render() {
        return (
            <View style={[styles.turret, { left: this.x, top: this.y }]} />
        );
    }
}

const styles = StyleSheet.create({
    turret: {
        backgroundColor: '#ff0000',
        height: HEIGHT,
        width: WIDTH,
        zIndex: 20,
        position: 'relative',
    },
});
