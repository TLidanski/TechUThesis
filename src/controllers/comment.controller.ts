import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Comment } from '../entity/Comment';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class CommentController implements IControllerBase {
    path: string = '/comments';
    router = express.Router();
    private repository = getRepository(Comment);

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.post(this.path, this.create);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const newComment = this.repository.create(req.body);
        const result = await this.repository.save(newComment);
        
        return res.json(result);
    }
}