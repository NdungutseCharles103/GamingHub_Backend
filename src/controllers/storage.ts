import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';

 class CloudStorage {
    public folder: string;
    public formats: string[];
    public storage: CloudinaryStorage;
    public upload: multer.Multer;

    constructor(folder: string, formats: string[]) {
        this.folder = folder;
        this.formats = formats;
        this.storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: this.folder,
                allowedFormats: this.formats,
            } as any,
        });
        this.upload = multer({ storage: this.storage });
    } 

}
export default CloudStorage;