import express, { Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer, { Multer } from 'multer';

export class MediaService {
    upload: Multer;
    private staticMediaPath: string = 'static/media';
    private acceptedMimeTypes: string[] = ['image/png', 'image/jpeg', 'video/mp4'];

    constructor() {
        this.upload = multer({
            storage: multer.diskStorage({
                destination: (req: Request, file: Express.Multer.File, callback: Function) => {
                    const userMediaFolder = this.staticMediaPath + '/' + req.body.user + '/' + this.getMediaType(file);
                    
                    fs.mkdir(userMediaFolder, {recursive: true}, err => {
                        if (err) {
                            console.error(err.stack);
                        } else {
                            callback(null, userMediaFolder);
                        }
                    });
                },
                filename: (req: Request, file: Express.Multer.File, callback: Function) => {
                    callback(null, this.generateFileName(file.originalname));
                }
            }),
            fileFilter: (req: Request, file: Express.Multer.File, callback: Function) => {
                callback(null, this.acceptedMimeTypes.includes(file.mimetype));
            }
        });
    }

    public getFilePathsArray = (files: Express.Multer.File[]): string[] => {
        const pathsArr: string[] = [];
        for (const file of files) {     
            pathsArr.push(file.path);
        }

        return pathsArr;
    }

    private generateFileName = (fileName: string): string => {
        const extension = path.extname(fileName);
        const baseName = path.basename(fileName, extension);

        return baseName + '-' + Date.now() + extension;
    }

    private getMediaType = (file: Express.Multer.File): string => {
        return file.mimetype.split('/')[0];
    }
}