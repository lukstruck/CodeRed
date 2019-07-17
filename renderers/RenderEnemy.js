import React from 'react';
import {StyleSheet, Image} from 'react-native';
import RenderEntity from "./RenderEntity";

const HEIGHT = 20;
const WIDTH = 20;

export default class RenderEnemy extends RenderEntity {

    render() {

        let direction = this.props.direction;
        let angle = Math.atan2(direction.y, direction.x) * 180 / Math.PI + 90;

        return (
            <Image
                style={[styles.turret, {
                    left: this.props.position.x * this.ratio.x - WIDTH / 2,
                    top: this.props.position.y * this.ratio.y - HEIGHT / 2,
                    transform: [{rotate: angle + "deg"}]
                }]}
                source={require("../assets/resourcepacks/default/images/entities/zombie.png")}/>
        );
    }
}

const styles = StyleSheet.create({
    turret: {
        // backgroundColor: '#ff0000',
        height: HEIGHT,
        width: WIDTH,
        zIndex: 20,
        position: 'absolute',
    },
});
