import Storage from './Storage'

export default class ResourceStorage {
    static getResourcePackList() {
        return Storage.load("ResourcePackList");
    }

    static setResourcePackList(newList: Array) {
        return Storage.store("ResourcePackList", newList);
    }

    static getResourcePackInfo(of: String) {
        return Storage.load("ResourcePackInfo:" + of);
    }

    static async addResourcePack(info: Object) {
        let name = info.name;
        Storage.store("ResourcePackInfo:" + name, info);
        let list = await this.getResourcePackList();
        list.push(name);
        return this.setResourcePackList(list);
    }

    static async removeResourcePack(name: String) {
        let list = await this.getResourcePackList();
        if (!list.find(item => item === name)) // if item not in list
            return;
        list = list.filter(item => item !== name);
        Storage.delete("ResourcepPackInfo:" + name);
        return this.setResourcePackList(list);
    }
}