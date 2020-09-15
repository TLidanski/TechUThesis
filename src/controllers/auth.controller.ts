import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';
import { User } from '../entity/User';

export class AuthController implements IControllerBase {
    path: string = '/';
    router = express.Router();
    private AuthService: AuthService = new AuthService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.post(this.path + 'login', this.AuthService.authenticateLocal);
        this.router.post(this.path + 'logout', (req: Request, res: Response) => {
            req.logOut();
        });
    }
}