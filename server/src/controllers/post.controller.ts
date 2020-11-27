import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../entity/Post';
import { MediaService } from '../services/media.service';
import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class PostController implements IControllerBase {
    path: string = '/posts';
    router = express.Router();
    private maxMediaNumber: number = 12;
    private repository = getRepository(Post);
    private MediaService: MediaService = new MediaService();
    private AuthService: AuthService = new AuthService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/:id', this.AuthService.isAuthenticated, this.getById);
        this.router.post(this.path, this.AuthService.isAuthenticated, this.MediaService.upload.array('media', this.maxMediaNumber), this.create);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const post = await this.repository.findOne(req.params.id, {relations: ['comments', 'comments.author', 'comments.reactions', 'reactions', 'reactions.user', 'media']});
        return res.json(post);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const postData = {
            ...req.body,
            media: await this.MediaService.saveMedia(Object.values(req.files))
        }

        const newPost = this.repository.create(postData);
        const result = await this.repository.save(newPost);

        return res.json(result);
    }
}