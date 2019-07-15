export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        let length = this.length();
        if(length === null)
            return this;
        this.x = this.x / length;
        this.y = this.y / length;
        return this;
    }

    normalized() {
        let length = this.length();
        if(length === null)
            return new Vector(0,0);
        return new Vector(this.x / length, this.y / length);
    }

    multiplied(by) {
        return new Vector(this.x * by, this.y * by);
    }

    multiply(by) {
        this.x *= by;
        this.y *= by;
        return this;
    }

    add(by) {
        this.x += by.x;
        this.y += by.y;
        return this;
    }

    added(by){
        return new Vector(this.x + by.x, this.y + by.y);
    }

    length(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    subtract(by) {
        this.x -= by.x;
        this.y -= by.y;
        return this;
    }

    subtracted(by){
        return new Vector(this.x - by.x, this.y - by.y);
    }

    toString(){
        return "[" + this.x + "," + this.y + "]";
    }

}