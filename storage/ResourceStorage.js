import Storage from './Storage'

export default class ResourceStorage {
    static getResourcePackList() {
        return Storage.load("ResourcePackList");
    }

    static getResourcePackInfo(of){
        return Storage.load("ResourcePackInfo:" + of);
    }

    static add(resourcePack){
        let name = resourcePack.name;
        Storage.store("ResourcePackInfo:" + name, resourcePack);
        // update ResourcePackList
    }
}