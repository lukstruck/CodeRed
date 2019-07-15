import React from "react";
import Turret from "../renderers/Turret";
import Zombie from "../renderers/Zombie";
import Vector from "./mathyStuff/Vector";
import Map from "../renderers/Map";

export default class EntityManager {

    entities = {
        0: {
            renderer: <Map />
        },
        1: {
            type: 'turret', // debug only
            position: new Vector(4, 4),
            direction: new Vector(-1, 0).normalize(),
            mods: [],
            renderer: <Turret />
            },
        2: {
            type: 'zombie', // debug only
            position: new Vector(16, 0),
            direction: new Vector(0,1).normalize(),
            nextPathPoint: 1,
            speed: 2,
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