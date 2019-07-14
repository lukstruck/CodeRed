import React from "react";
import Turret from "../renderers/Turret";
import Zombie from "../renderers/Zombie";
import Vector from "./mathyStuff/Vector";

export default class EntityManager {

    entities = {
        1: {
            type: 'turret', // debug only
            position: new Vector(4, 4),
            direction: new Vector(-1, 0).normalize(),
            turnSpeed: 90, // degrees per second, might be changed to radians per second
            mods: [],
            renderer: <Turret />
            },
        2: {
            type: 'zombie', // debug only
            position: new Vector(3, 7),
            direction: new Vector(1,2).normalize(),
            speed: 1,
            health: 50,
            renderer: <Zombie />
            },
    };

    getEntities(){
        return this.entities;
    }
}

// for now
export const EM = new EntityManager();