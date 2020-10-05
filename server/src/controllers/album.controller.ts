import express, { Request, Response } from 'express';
import { getRepository, In } from 'typeorm';

import { Album } from '../entity/Album';
import { Media } from '../entity/Media';
import { MediaService } from '../services/media.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class AlbumController implements IControllerBase {
    path: string = '/albums';
    router = express.Router();
    private maxMediaNumber: number = 36;
    private repository = getRepository(Album);
    private MediaService: MediaService = new MediaService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/:id', this.getById);
        this.router.post(this.path, this.MediaService.upload.array('media', this.maxMediaNumber), this.create);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const album = await this.repository.findOne(req.params.id, {relations: ['media']});
        return res.json(album);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        let uploadedMedia: Media[]  = [];
        let postedMedia: Media[] = [];
        const mediaRepository = getRepository(Media);

        if (req.files) {
            uploadedMedia = await this.MediaService.saveMedia(Object.values(req.files));
        }

        if (req.body.postedMedia) {
            postedMedia = await mediaRepository.find({id: In(req.body.postedMedia)});
        }
        const albumData = {
            ...req.body,
            media: [...uploadedMedia, ...postedMedia]
        };
        const newAlbum = this.repository.create(albumData);
        
        const result = await this.repository.save(newAlbum);   
        return res.json(result);
    }
}