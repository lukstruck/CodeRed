export default class ImageFetcher {
    static fetchToBase64(url: String): Promise<String> {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {resolve(reader.result)};
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    }
}