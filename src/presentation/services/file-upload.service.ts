import { UploadedFile } from "express-fileupload";
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url'
import { Uuid } from "../../config/index.js";
import { CustomError } from "../../domain/index.js";

export class FileUploadService {
    constructor(
        private readonly uuid = Uuid.v4
    ) { }

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
            const fileExtension = file.mimetype.split('/').at(1) ?? ''
            if(!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`)
            }

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const destination = path.resolve(__dirname, '../../../', folder)
            this.checkFolder(destination)

            const fileName =  `${this.uuid()}.${fileExtension}`

            file.mv(`${destination}/${fileName}`)

            return {fileName}
        } catch (error) {
            console.log({error})
            throw error
        }

    }

    public async uploadMultiple(
        files: UploadedFile[],
        folder: string = 'uploads',
        validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
    ) {
        const fileNames = await Promise.all(
            files.map(file => this.uploadSingle(file, folder, validExtensions))
        )

        return fileNames
    }
}