import Storage from './Storage'
import ResourcepackInfo from "../resourcePackStructure/Resourcepack";

export default class ResourceStorage {
    static getResourcePackList() {
        return Storage.load("ResourcePackList").then(result => {
            if (result === null || result === undefined)
                result = [];
            return result;
        });
    }

    static setResourcePackList(newList: Array) {
        return Storage.store("ResourcePackList", newList);
    }

    static getResourcePackInfo(of: String) {
        return Storage.load("ResourcePackInfo:" + of);
    }

    static async addResourcePack(info: ResourcepackInfo) {
        let name = info.name;
        let list = await this.getResourcePackList();
        if (!list.includes(name)) {
            list.push(name);
        }else {
            await this.removeResourcePack(info.name);
        }
        Storage.store("ResourcePackInfo:" + name, info.toJson());
        return Promise.all([
            this.setResourcePackList(list),
            this.setResource(name, 'turretBases', info.turretBases),
            this.setResource(name, 'turretMods', info.turretMods),
            this.setResource(name, 'projectiles', info.projectiles),
            this.setResource(name, 'enemies', info.enemies),
            this.setResource(name, 'rounds', info.rounds),
            this.setResource(name, 'waves', info.waves),
            this.setResource(name, 'maps', info.maps),
        ]);
    }

    static async removeResourcePack(name: String) {
        let list = await this.getResourcePackList();
        if (!list.find(item => item === name)) // if item not in list
            return;
        list = list.filter(item => item !== name);
        return Promise.all([
            Storage.delete("ResourcepPackInfo:" + name),
            this.setResourcePackList(list),
            this.deleteResource(name, 'turretBases'),
            this.deleteResource(name, 'turretMods'),
            this.deleteResource(name, 'projectiles'),
            this.deleteResource(name, 'enemies'),
            this.deleteResource(name, 'rounds'),
            this.deleteResource(name, 'waves'),
            this.deleteResource(name, 'maps'),
        ]);
    }

    static setResource(resourcepackName: String, resource: String, turretBases: Array) {
        return Storage.store(resourcepackName + "." + resource, turretBases);
    }

    static async getAllResourceType(resourceName: String) {
        let list = await this.getResourcePackList();
        let ret = await Promise.all(list.map(resourcepack => this.getResource(resourcepack, resourceName)));
        return ret.flat();
    }

    static getResource(resourcepackName: String, resourceName: String) {
        return Storage.load(resourcepackName + "." + resourceName);
    }

    static deleteResource(resourcepackName: String, resourceName: String) {
        return Storage.delete(resourcepackName + "." + resourceName);
    }

}