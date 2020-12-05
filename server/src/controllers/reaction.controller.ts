import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Reaction } from '../entity/Reaction';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class ReactionController implements IControllerBase {
    path: string = '/reactions';
    router = express.Router();
    private repository = getRepository(Reaction);

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.post(this.path, this.create);
        this.router.get(this.path + '/:id', this.getPostReactions);
        this.router.get(this.path + '/comments/:id', this.getCommentReactions);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const reaction = this.repository.create(req.body);

        const result = await this.repository.save(reaction);   
        return res.json(result);
    }

    private getPostReactions = async (req: Request, res: Response): Promise<Response> => {
        const reactions = await this.repository.find({
            where: {postId: req.params.id}
        });

        return res.json(reactions);
    }

    private getCommentReactions = async (req: Request, res: Response): Promise<Response> => {
        const reactions = await this.repository.find({
            relations: ['user'],
            where: {commentId: req.params.id}
        });

        return res.json(reactions);
    }
}