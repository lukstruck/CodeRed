export default class Resourcepack {

    /**
     *
     * @param name  unique identifier
     * @param version   unique identifier
     * @param icon  Base64 String of the Icon
     * @param entities
     * @param rounds
     * @param waves
     * @param maps
     */
    constructor(name: String, version: String, icon: String, entities: Entities, rounds: Array, waves: Array, maps: Array){
        this.name = name;
        this.version = version;
        this.icon = icon;
        this.entities = entities;
        this.rounds = rounds;
        this.waves = waves;
        this.maps = maps;
    }
}

class Entities {
    constructor(turretBases: Array, turretModifications: Array, projectiles: Array, enemies: Array){
        this.turretBases = turretBases;
        this.turretModifications = turretModifications;
        this.projectiles = projectiles;
        this.enemies = enemies;
    }
}