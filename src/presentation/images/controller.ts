import { Request, Response } from "express";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url'


export class ImageController {
    constructor() { }

    getImage = (req: Request, res: Response) => {
        const { type = '', img = '' } = req.params

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`)
        if(!fs.existsSync(imagePath)) {
            return res.status(404).send('Image not found')
        }

        res.sendFile(imagePath)
    }
}