import Storage from './Storage'

export default class IconStore {
    static getIcon(uid: String) {
        return Storage.load("Icon:" + uid);
    }

    static setIcon(uid: String, icon: String) {
        return Storage.store("Icon:" + uid, icon);
    }

    static savingIcons = false;
    static iconsToBeStored = {};

    static setIconToBeStored(uid: String, icon: string) {
        this.iconsToBeStored[uid] = icon;
    }

    static clearIconsToBeStored() {
        if (!this.savingIcons)
            this.iconsToBeStored = {};
    }

    static async saveIconsToBeStored() {
        this.savingIcons = true;
        let promises = [];
        let count = 0;
        for (let key in this.iconsToBeStored) {
            if (this.iconsToBeStored.hasOwnProperty(key)) {
                promises.push(this.setIcon(key, this.iconsToBeStored[key]));
                count++;
            }
        }
        await Promise.all(promises);
        this.savingIcons = false;
        this.clearIconsToBeStored();
        return count;
    }

    static getIconsUidsToBeStored() {
        let ret = [];
        for (let key in this.iconsToBeStored) {
            if (this.iconsToBeStored.hasOwnProperty(key)) {
                ret.push(key);
            }
        }
        return ret;
    }
}