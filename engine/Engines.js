import MapHelper from "../renderers/Helper";
import Vector from "./mathyStuff/Vector";

const MoveEntities = (entities, args) => {
    Object.values(entities).filter(isMovable).forEach(move);

    return entities;
};


function isMovable(entity) {
    // console.log(entity);
    return entity.direction && entity.speed;
}

function move(entity) {
    let map = MapHelper.getMap();
    let nextPathPoint = map.path[entity.nextPathPoint];
    let speed = entity.speed / 60.0; // speed is givin in m / second, 60 ticks per second.

    let direction = entity.direction;
    let oldPosition = entity.position;

    let newPosition = entity.position.added(direction.multiplied(speed));
    let distanceToNextPathPoint = nextPathPoint.subtracted(oldPosition).length();
    let distanceToNewPosition = newPosition.subtracted(oldPosition).length();

    if(distanceToNextPathPoint < distanceToNewPosition){
        entity.nextPathPoint++;
        if(entity.nextPathPoint >= map.path.length){
            entity.nextPathPoint = 1;
            oldPosition = entity.position = map.path[0].copy();
        }
        nextPathPoint = map.path[entity.nextPathPoint];
        direction = nextPathPoint.subtracted(oldPosition).normalize();
        entity.direction = direction;
    }

    entity.position.add(direction.multiplied(speed));
}

export default MoveEntities;