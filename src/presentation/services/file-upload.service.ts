import { UploadedFile } from "express-fileupload";
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url'

export class FileUploadService {
    constructor() { }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }
    }

    public async uploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        try {
            const fileExtension = file.mimetype.split('/').at(1)

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const destination = path.resolve(__dirname, '../../../', folder)
            this.checkFolder(destination)

            file.mv(destination + `/mi-imagen.${fileExtension}`)
        } catch (error) {
            console.log({error})
        }

    }

    public uploadMultiple(
        file: any[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {

    }
}