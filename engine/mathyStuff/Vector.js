export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x = this.x / length;
        this.y = this.y / length;
        return this;
    }

    normalized() {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
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

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    added(vector){
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
}