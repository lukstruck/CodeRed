import {AsyncStorage} from 'react-native';
import Version from './Version';

function justReturn(params) {
    return params;
}

const PREFIX = "@CodeRed:";
const NUM_OUTPUT_CHARS = 50;


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

    static async store(key: String, value) {
        await this._store(Version.getVersion() + key, JSON.stringify(value));
        return "[STORAGE.store] storing " + key + ": " + JSON.stringify(value).substring(0, NUM_OUTPUT_CHARS);
    }

    static async load(key: String) {
        let loaded = await this._load(Version.getVersion() + key);
        if(loaded !== null)
        console.log("[STORAGE.load] loaded " + key + ": " + loaded.substring(0, NUM_OUTPUT_CHARS));
        return JSON.parse(loaded);
    }

    static async delete(key: String) {
        let result = await this._delete(Version.getVersion() + key);
        return "[STORAGE.delete] deleted " + key + " -> " + result;
    }

    static getLastUsedVersion() {
        return this._load("version");
    }

    static setCurrentUsedVersion(version: String) {
        return this._store("version", version);
    }

}