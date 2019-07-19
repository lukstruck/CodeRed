export default class ResourcepackInfo {

    name: String;
    version: String;
    icon: String;
    turretBases: Array;
    turretMods: Array;
    projectiles: Array;
    enemies: Array;
    rounds: Array;
    waves: Array;
    maps: Array;

    /**
     *
     * @param data
     */
    constructor(data) {
        this.name = data.name;
        this.version = data.version;
        this.icon = data.icon;
        this.turretBases = data.turretBases;
        this.turretMods = data.turretMods;
        this.projectiles = data.projectiles;
        this.enemies = data.enemies;
        this.rounds = data.rounds;
        this.waves = data.waves;
        this.maps = data.maps;
    }

    toJson() {
        let ret = JSON.parse(JSON.stringify(this));
        ret.turretBases = ret.turretBases.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.turretMods = ret.turretMods.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.projectiles = ret.projectiles.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.enemies = ret.enemies.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.rounds = ret.rounds.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.waves = ret.waves.map(item => {
            return {name: this.name + "." + item.name}
        });
        ret.maps = ret.maps.map(item => {
            return {name: this.name + "." + item.name}
        });
        console.log(ret);

        return ret;
    }
}
