import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import RenderEntity from "./RenderEntity";
import ImageCache from "../storage/ImageCache";

const HEIGHT = 20;
const WIDTH = 20;

export default class RenderTurret extends RenderEntity {

    render() {

        let direction = this.props.direction;
        let angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI + 90;

        let mods = this.renderMods();

        return (
            <View>
                <Image
                    style={[styles.turret, {
                        left: this.props.position.x * this.ratio.x - WIDTH / 2,
                        top: this.props.position.y * this.ratio.y - HEIGHT / 2,
                        transform: [{rotate: angle + "deg"}]
                    }]}
                    source={ImageCache.getImage(this.props.imageId)}/>
                {mods}
            </View>
        );
    }

    renderMods() {
        return undefined;
    }
}

const styles = StyleSheet.create({
    turret: {
        height: HEIGHT,
        width: WIDTH,
        zIndex: 10,
        position: 'absolute',
    },
    modification: {
        height: HEIGHT/ 5,
        width: WIDTH/5,
        zIndex: 11,
        position: 'absolute'
    }
});
