export default class ResourcePackFetcher {
    static getResourcePack(url) {
        return fetch(url)
            .then((response) => {return response.json()})
    }

    static getImage(url){
        return fetch(url)
    }
}