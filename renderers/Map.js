import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Entity from "./Entity";

export default class Map extends Entity {

    render() {
        return (
            <View>
                <Image style={styles.image} source={{uri: "assets/resourcepacks/default/images/maps/bloonsNostalgia.png"}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        zIndex: 1,
        top: 0,
        left: 0,
        position: 'absolute',
        resizeMode: 'contain'
    },
});
