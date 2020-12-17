import express, { Request } from 'express';
import fs from 'fs';
import path from 'path';
import multer, { Multer } from 'multer';
import { getRepository } from 'typeorm';

import { Media } from '../entity/Media';
import { Album } from '../entity/Album';
import { User } from '../entity/User';

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

    public saveMedia = async (files: Express.Multer.File[]) => {
        let mediaDataArr: Media[] = [];
        const mediaRepository = getRepository(Media);

        for (const file of files) {
            const fileObj: Record<string, string> = {
                type: this.getMediaType(file),
                path: file.path.replace('static\\', '')
            }

            const media = mediaRepository.create(fileObj);
            const mediaResult = await mediaRepository.save(media);
            mediaDataArr.push(mediaResult);
        }

        return mediaDataArr;
    }

    public saveProfilePicture = async (file: Express.Multer.File, user: User) => {
        const albumRepo = getRepository(Album);
        const fileRecordArr = await this.saveMedia([file]);

        const profilePicAlbumData = {
            name: 'Profile Pictures',
            user: user,
            media: fileRecordArr
        };
        const profilePicAlbum = albumRepo.create(profilePicAlbumData);
        await albumRepo.save(profilePicAlbum);

        return fileRecordArr[0];
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