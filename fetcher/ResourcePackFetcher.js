export default class ResourcePackFetcher {
    static getResourcePack(url) {
        return fetch(url, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then((response) => {
                return response.json()
            })
    }
}