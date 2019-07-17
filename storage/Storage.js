import {AsyncStorage} from 'react-native';
import Version from './Version';

function justReturn(params) {
    return params;
}

const PREFIX = "@CodeRed:";

export default class Storage {

    static _store(key: String, value){
        return AsyncStorage.setItem(PREFIX + key, value, justReturn);
    }

    static _load(key: String){
        return AsyncStorage.getItem(PREFIX + key, justReturn)
    }

    static _delete(key: String){
        return AsyncStorage.removeItem(PREFIX + key, justReturn)
    }

    static store(key: String, value) {
        console.log("[STORAGE.store] storing " + key + ": " + JSON.stringify(value));
        return this._store(Version.getVersion() + key, JSON.stringify(value));
    }

    static load(key: String) {
        return this._load(Version.getVersion() + key).then(loaded => {
            console.log("[STORAGE.load] loaded " + key + ": " + loaded);
            return JSON.parse(loaded);
        });
    }

    static delete(key: String){
        return this._delete(Version.getVersion() + key).then(result => {
            console.log("[STORAGE.delete] deleted " + key + " -> " + result);
        });
    }

    static getLastUsedVersion() {
        return this._load("version");
    }

    static setCurrentUsedVersion(version: String) {
        return this._store("version", version);
    }

}