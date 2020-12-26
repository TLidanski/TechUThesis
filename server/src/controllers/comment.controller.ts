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
        this.router.get(this.path + '/:postId', this.getByPostId);
        this.router.get(this.path + '/replies/:commentId', this.getByCommentId);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const newComment = this.repository.create(req.body);
        const result = await this.repository.save(newComment);
        
        return res.json(result);
    }

    private getByPostId = async (req: Request, res: Response): Promise<Response> => {
        const comment = await this.repository.find({
            relations: ['author', 'post', 'reactions', 'replies', 'reactions.user'],
            where: {postId: req.params.postId},
            order: {createdAt: 'DESC'}
        });
        return res.json(comment);
    }

    private getByCommentId = async (req: Request, res: Response): Promise<Response> => {
        const comment = await this.repository.find({
            relations: ['author', 'reactions', 'reactions.user'],
            where: {parentCommentId: req.params.commentId},
            order: {createdAt: 'DESC'}
        });
        return res.json(comment);
    }
}