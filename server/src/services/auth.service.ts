import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';
import { CryptoService } from './crypto.service';

export class AuthService {
    private userRepository = getRepository(User);
    private LocalStrategy = passportLocal.Strategy;
    private CryptoService: CryptoService = new CryptoService();

    constructor() {
        passport.serializeUser((user: User, callback: Function) => {
            callback(null, user.id)
        });

        passport.deserializeUser(async (id: number, callback: Function) => {
            const user = await this.userRepository.findOne(id);
            callback(null, user);
        });

        this.initLocalStrategy();
    }

    private initLocalStrategy = () => {
        passport.use(new this.LocalStrategy({usernameField: 'username', passwordField: 'password'}, 
        async (username: string, password: string, callback: Function): Promise<Function> => {

            const user = await this.userRepository.findOne({username});
            if (user) {
                
                const passwordMatch = await this.CryptoService.comparePassword(password, user.password);
                if (!passwordMatch) {
                    return callback(null, false, {message: 'Incorrect password'});
                }
                return callback(null, user);
            }

            return callback(null, false, {message: 'Incorrect username'});
        }));
    }

    public authenticateLocal = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (user) {
                req.logIn(user, () => console.log('User logged in'));
                res.json({success: true, msg: 'Authenticated', user});
            } else {
                res.json({success: false, msg: info});
            }
        })(req, res, next);
    }

    public isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.json({success: false, msg: 'Not authenticated'});
        }
    }
}