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
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const reaction = this.repository.create(req.body);

        const result = await this.repository.save(reaction);   
        return res.json(result);
    }
}