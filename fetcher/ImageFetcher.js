import ImgToBase64 from 'react-native-image-base64';

export default class ImageFetcher {
    fetchToBase64(url: String): Promise<String> {
        return new Promise<String>(
            (resolve, reject) => {
                ImgToBase64.getBase64String(url, (err, base64string) => {
                    if(err)
                        reject(err);
                    else
                        resolve(base64string);
                })
            });
    }
}