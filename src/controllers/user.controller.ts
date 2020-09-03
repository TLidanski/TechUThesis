import express, {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User} from '../entity/User';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class UserController implements IControllerBase {
    path: string = '/users';
    router = express.Router();
    private repository = getRepository(User);

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/id/:id', this.getById);
        this.router.get(this.path + '/:username', this.getByUsername);
        this.router.post(this.path, this.create);
        this.router.put(this.path + '/:id', this.edit);
        this.router.delete(this.path + '/:id', this.delete);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.params.id);
        return res.json(user);
    }

    private getByUsername = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne({username: req.params.username});
        return res.json(user);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const newUser = this.repository.create(req.body);
        const result = await this.repository.save(newUser);
        
        return res.json(result);
    }

    private edit = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.params.id);
        if (user) {
            this.repository.merge(user, req.body);
            const result = await this.repository.save(user);

            return res.json(result);
        }

        return res.json({success: false, msg: 'User not found'});
    }

    private delete = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.repository.delete(req.params.id);
        return res.json(result);
    }
}