import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../entity/Post';
import { MediaService } from '../services/media.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class PostController implements IControllerBase {
    path: string = '/posts';
    router = express.Router();
    private repository = getRepository(Post);
    private mediaService: MediaService = new MediaService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/:id', this.getById);
        this.router.post(this.path, this.mediaService.upload.single('pic'), this.create);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const post = await this.repository.findOne(req.params.id);
        return res.json(post);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const newPost = new Post();
        newPost.text = req.body.text;
        newPost.mediaPath = req.file.path;
        newPost.likes = req.body.likes;

        const result = await this.repository.save(newPost);
        return res.json(result);
    }
}