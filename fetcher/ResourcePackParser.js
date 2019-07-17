import ImageFetcher from "./ImageFetcher";

export default class ResourcePackParser {
    static parseImages(resourcePackJson) {
        let promiseRet = [];
        for (let key in resourcePackJson) {
            if (resourcePackJson.hasOwnProperty(key)) {
                if (typeof resourcePackJson[key] === "object") {
                    promiseRet = promiseRet.concat(ResourcePackParser.parseImages(resourcePackJson[key]));
                } else if (Array.isArray(resourcePackJson[key])) {
                    for (let elem of resourcePackJson[key]) {
                        promiseRet = promiseRet.concat(ResourcePackParser.parseImages(elem));
                    }
                }
                if (key === "image" || key === "icon") {
                    promiseRet.push(ImageFetcher.fetchToBase64(resourcePackJson[key]).then(b64string => {
                        return resourcePackJson[key] = b64string
                    }).catch(() => {
                    }));
                }
            }
        }
        // console.log(promiseRet);
        return promiseRet;
    }
}