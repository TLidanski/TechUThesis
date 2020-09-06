import express, { Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer, { Multer } from 'multer';

export class MediaService {
    upload: Multer;
    staticMediaPath: string = 'static/media';

    constructor() {
        this.upload = multer({storage: multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, callback: Function) => {

                fs.mkdir(this.staticMediaPath, {recursive: true}, err => {
                    if (err) {
                        console.error(err.stack);
                    } else {
                        callback(null, this.staticMediaPath);
                    }
                });
            },
            filename: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, this.generateFileName(file.originalname));
            }
        })});
    }

    private generateFileName = (fileName: string) => {
        const extension = path.extname(fileName);
        const baseName = path.basename(fileName, extension);
        
        return baseName + '-' + Date.now() + extension;
    }
}