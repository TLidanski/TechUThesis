import express, { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

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
            res.json({msg: 'Logged out'});
        });
        this.router.get(this.path + 'isAuthenticated', this.AuthService.isAuthenticated, (req: Request, res: Response) => {
            res.json({success: true});
        });
    }
}