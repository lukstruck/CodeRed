const MoveEntities = (entities, args) => {
    entities.filter(isMovable).forEach(move);

    return entities;
};


function isMovable(entity) {
    return entity.direction && entity.speed;
}

function move(entity) {
    let direction = entity.direction;
    let speed = entity.speed / 60.0; // speed is givin in m / second, 60 ticks per second.
    entity.position.add(direction.multiplied(speed));
}

export default MoveEntities;