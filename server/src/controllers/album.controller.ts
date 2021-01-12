import express, { Request, Response } from 'express';
import { getRepository, In } from 'typeorm';

import { Album } from '../entity/Album';
import { Media } from '../entity/Media';
import { User } from '../entity/User';
import { MediaService } from '../services/media.service';
import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class AlbumController implements IControllerBase {
    path: string = '/albums';
    router = express.Router();
    private maxMediaNumber: number = 36;
    private repository = getRepository(Album);
    private MediaService: MediaService = new MediaService();
    private AuthService: AuthService = new AuthService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/:id', this.AuthService.isAuthenticated, this.getById);
        this.router.get(this.path + '/user/:id', this.AuthService.isAuthenticated, this.getUserAlbums);
        this.router.post(this.path, this.AuthService.isAuthenticated, this.MediaService.upload.array('media', this.maxMediaNumber), this.create);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const album = await this.repository.findOne(req.params.id, {relations: ['media']});
        return res.json(album);
    }

    private getUserAlbums = async (req: Request, res: Response): Promise<Response> => {
        const albums = await this.repository.find({
            relations: ['media'],
            where: {userId: req.params.id}
        });

        return res.json(albums);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        let uploadedMedia: Media[]  = [];
        let postedMedia: Media[] = [];
        const mediaRepository = getRepository(Media);
        const userRepository = getRepository(User)
        const user = await userRepository.findOne(req.body.userId);

        if (req.files) {
            uploadedMedia = await this.MediaService.saveMedia(Object.values(req.files));
        }

        if (req.body.postedMedia) {
            postedMedia = await mediaRepository.find({id: In(req.body.postedMedia)});
        }
        const albumData = {
            ...req.body,
            user: user,
            media: [...uploadedMedia, ...postedMedia]
        };
        const newAlbum = this.repository.create(albumData);
        
        const result = await this.repository.save(newAlbum);   
        return res.json(result);
    }
}