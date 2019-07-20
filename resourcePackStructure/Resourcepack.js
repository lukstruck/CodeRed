export const Resource = {
    TURRETBASEs: 'turretBases',
    TURRETMODS: 'turretMods',
    PROJECTILES: 'projectiles',
    ENEMIES: 'enemies',
    ROUNDS: 'rounds',
    WAVES: 'waves',
    MAPS: 'maps',
    MODES: 'modes',
};
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
    modes: Array;

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
        this.modes = data.modes;
    }

    toJson() {
        let ret = JSON.parse(JSON.stringify(this));

        Object.values(Resource).forEach(type => {
            ret[type] = ret[type].map(item => {
                return {name: this.name + "." + item.name}
            });
        });

        return ret;
    }
}
