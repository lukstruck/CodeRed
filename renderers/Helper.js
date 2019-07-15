import Vector from "../engine/mathyStuff/Vector";

export default class MapHelper {

    static clients = []; // observer pattern

    static position = new Vector(-1, -1);
    // static position = new Vector(0, 0);
    static viewSize = new Vector(-1, -1);
    // static viewSize = new Vector(500, 700);

    static mapSize = new Vector(-1, -1);
    // static mapSize = new Vector(20, 30);

    static map = undefined;


    static setMapViewSize(x, y, width, height){
        this.position = new Vector(x, y);
        this.viewSize = new Vector(width, height);
        this.notifyAll();
    }

    static setMapSize(width, height) {
        this.mapSize = new Vector(width, height);
    }

    static getMapToViewRatios(){
        return new Vector(this.viewSize.x / this.mapSize.x, this.viewSize.y / this.mapSize.y);
    }

    static register(client){
        this.clients.push(client);
    }

    static notifyAll(){
        this.clients.forEach(client => client.updateRatio());
    }

    static setMap(map){
        this.map = map;
    }

    static getMap(){
        return this.map;
    }
}