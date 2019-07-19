import Assets from "./Assets";

export default class TurretBase {

    name: String;
    size: Array;
    modificationslots: Array;
    assets: Assets;

    constructor(data){
        this.name = data.name;
        this.size = data.size;
        this.modificationslots = data.modificationslots;
        this.assets = new Assets(data.assets);
    }
}