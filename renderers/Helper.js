import Vector from "../engine/mathyStuff/Vector";

export default class MapLayoutHelper {

    static position = new Vector(-1, -1);
    static viewSize = new Vector(-1, -1);

    static mapSize = new Vector(-1, -1);


    static setMapViewSize(x, y, width, height){
        this.position = new Vector(x, y);
        this.viewSize = new Vector(width, height);
    }

    static setMapSize(width, height) {
        this.mapSize = new Vector(width, height);
    }

    static getMapToViewRatios(){
        return new Vector(this.viewSize.x / this.mapSize.x, this.viewSize.y / this.mapSize.y);
    }
}