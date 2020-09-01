import express, {Request, Response} from 'express';
import {getRepository} from 'typeorm';

import {User} from '../entity/User';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class UserController implements IControllerBase {
    path: string = '/users';
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.post(this.path, this.createUser);
    }

    private createUser = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body);
        const newUser = await getRepository(User).create(req.body);
        const results = await getRepository(User).save(newUser);
        
        return res.json(results);
    }
}