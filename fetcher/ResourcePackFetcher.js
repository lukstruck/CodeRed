export default class ResourcePackFetcher {
    getResourcePack(url) {
        return fetch(url)
            .then((response) => {return response.json()})
            .catch((error) => {
                console.error(error);
            });
    }
}