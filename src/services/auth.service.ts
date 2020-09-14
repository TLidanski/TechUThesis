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
        passport.use(new this.LocalStrategy(async (username: string, password: string, callback: Function): Promise<Function> => {

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
}