import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';
import { CryptoService } from '../services/crypto.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class UserController implements IControllerBase {
    path: string = '/users';
    router = express.Router();
    private repository = getRepository(User);
    private CryptoService: CryptoService = new CryptoService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/id/:id', this.getById);
        this.router.get(this.path + '/:username', this.getByUsername);
        this.router.post(this.path, this.create);
        this.router.put(this.path + '/:id', this.edit);
        this.router.delete(this.path + '/:id', this.delete);

        this.router.get(this.path + '/friends/:id', this.getFriends);
        this.router.post(this.path + '/friends/:id', this.addFriend);
        this.router.delete(this.path + '/friends/:id', this.removeFriend);
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
        if (await this.repository.find({email: req.body.email})) {
            return res.json({success: false, msg: 'Email already exists'});
        }

        if (req.body.password != req.body.confirmPassword) {
            return res.json({success: false, msg: 'Passwords do not match'});
        }
        const userData = {
            ...req.body,
            password: await this.CryptoService.hashPassword(req.body.password)
        };
        const newUser = this.repository.create(userData);
        
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

    private getFriends = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.repository.findOne(req.params.id, {relations: ['friends']});
        return res.json(result);
    }

    private addFriend = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.params.id, {relations: ['friends']});
        const friend = await this.repository.findOne(req.body.friendId, {relations: ['friends']});
        if (user && friend) {
            user.friends.push(friend);
            friend.friends.push(user);

            await this.repository.save(user);
            return res.json({success: true}); // user.friends.friends contains user -> circular structure - causes JSON.stringify to error
        }

        return res.json({success: false, msg: 'User or friend not found'});
    }

    private removeFriend = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.params.id, {relations: ['friends']});
        const friend = await this.repository.findOne(req.body.friendId, {relations: ['friends']});
        if (user && friend) {
            user.friends = user.friends.filter(friend => friend.id !== req.body.friendId);
            friend.friends = friend.friends.filter(friend => friend.id.toString() !== req.params.id);

            await this.repository.save(friend);
            const result = await this.repository.save(user);

            return res.json(result);
        }

        return res.json({success: false, msg: 'User or friend not found'});
    }
}