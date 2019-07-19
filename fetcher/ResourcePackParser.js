import ImageFetcher from "./ImageFetcher";
import IconStore from "../storage/IconStore";

export default class ResourcePackParser {
    static parseImages(resourcePackJson, fetchedImage: (key, value) => void) {
        if (fetchedImage === undefined){
            fetchedImage = () => {};
        }
        let promiseRet = [];
        for (let key in resourcePackJson) {
            if (resourcePackJson.hasOwnProperty(key)) {
                if (typeof resourcePackJson[key] === "object") {
                    promiseRet = promiseRet.concat(ResourcePackParser.parseImages(resourcePackJson[key], fetchedImage));
                } else if (Array.isArray(resourcePackJson[key])) {
                    for (let elem of resourcePackJson[key]) {
                        promiseRet = promiseRet.concat(ResourcePackParser.parseImages(elem, fetchedImage));
                    }
                }
                if (key === "image" || key === "icon") {
                    promiseRet.push(ImageFetcher.fetchToBase64(resourcePackJson[key]).catch(() => {
                        return null;
                    }).then(b64string => {
                        fetchedImage(resourcePackJson[key], b64string);
                        IconStore.setIconToBeStored(resourcePackJson[key], b64string);
                        return resourcePackJson[key]
                    }));
                }
            }
        }
        return promiseRet;
    }
}