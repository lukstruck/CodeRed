import Storage from './Storage'
import ResourcepackInfo, {Resource} from "../resourcePackStructure/Resourcepack";

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
        console.log(info);
        let name = info.name;
        let list = await this.getResourcePackList();
        if (!list.includes(name)) {
            list.push(name);
        } else {
            await this.removeResourcePack(info.name);
        }

        let promises = [
            Storage.store("ResourcePackInfo:" + name, info.toJson()),
            this.setResourcePackList(list)
        ];
        Object.values(Resource).forEach(item => {
            promises.push(this.setResource(name, item, info[item]))
        });

        return Promise.all(promises);
    }

    static async removeResourcePack(name: String) {
        let list = await this.getResourcePackList();
        if (!list.find(item => item === name)) // if item not in list
            return;
        list = list.filter(item => item !== name);

        let promises = [
            Storage.delete("ResourcepPackInfo:" + name),
            this.setResourcePackList(list),
        ];
        Object.values(Resource).forEach(item => {
            promises.push(this.deleteResource(name, item));
        });

        return Promise.all(promises);
    }

    static setResource(resourcepackName: String, resource: String, data: Array) {
        return Storage.store(resourcepackName + "." + resource, data);
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

