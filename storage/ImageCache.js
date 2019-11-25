import IconStore from "./IconStore";

export default class ImageCache {
    static images = {};

    static getImage(id: String): String{
        if(ImageCache.images[id] == null){
            ImageCache.images[id] = IconStore.getIcon(id);
        }
        return ImageCache.images[id]
    }
}