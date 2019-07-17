import React from "react";
import RenderTurret from "../renderers/RenderTurret";
import RenderEnemy from "../renderers/RenderEnemy";
import Vector from "./mathyStuff/Vector";

export default class EntityManager {

    entities = {
        1: {
            type: 'turret', // debug only
            position: new Vector(4, 4),
            direction: new Vector(-1, 0).normalize(),
            mods: [],
            renderer: <RenderTurret />
            },
        2: {
            type: 'zombie', // debug only
            position: new Vector(16, 0),
            direction: new Vector(0,1).normalize(),
            nextPathPoint: 1,
            speed: 10,
            health: 50,
            renderer: <RenderEnemy />
            },
    };

    getEntities(){
        return this.entities;
    }
}

// for now
export const EM = new EntityManager();