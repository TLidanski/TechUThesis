import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Like } from 'typeorm';

import { User } from '../entity/User';
import { Media } from '../entity/Media';
import { FriendRequest } from '../entity/FriendRequest';
import { CryptoService } from '../services/crypto.service';
import { MediaService } from '../services/media.service';
import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class UserController implements IControllerBase {
    path: string = '/users';
    router = express.Router();
    private repository = getRepository(User);
    private CryptoService: CryptoService = new CryptoService();
    private MediaService: MediaService = new MediaService();
    private AuthService: AuthService = new AuthService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/id/:id', this.AuthService.isAuthenticated, this.getById);
        this.router.get(this.path + '/:username', this.AuthService.isAuthenticated, this.getByUsername);
        this.router.get(this.path + '/search/:query', this.AuthService.isAuthenticated, this.searchUsers);
        this.router.post(this.path, this.create);
        this.router.put(this.path + '/:id', this.AuthService.isAuthenticated, this.edit);
        this.router.delete(this.path + '/:id', this.AuthService.isAuthenticated, this.delete);

        this.router.post(this.path + '/avatar', this.MediaService.upload.single('avatar'), this.setAvatar);

        this.router.get(this.path + '/friends/:id', this.AuthService.isAuthenticated, this.getFriends);
        this.router.post(this.path + '/friends', this.AuthService.isAuthenticated, this.addFriend);
        this.router.delete(this.path + '/friends/:id', this.AuthService.isAuthenticated, this.removeFriend);

        this.router.get(this.path + '/media/:id', this.AuthService.isAuthenticated, this.getUserMedia);

        this.router.get(this.path + '/friends/request/:id', this.AuthService.isAuthenticated, this.getFriendRequests);
        this.router.delete(this.path + '/friends/request/:id', this.AuthService.isAuthenticated, this.deleteFriendRequest);
        this.router.post(this.path + '/friends/request', this.AuthService.isAuthenticated, this.createFriendRequest);
        this.router.post(this.path + '/friends/has-friend', this.AuthService.isAuthenticated, this.hasFriend);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.params.id);
        return res.json(user);
    }

    private getByUsername = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne({
            where: {username: req.params.username}
        });

        return res.json(user);
    }

    private searchUsers = async (req: Request, res: Response): Promise<Response> => {
        const users = await this.repository.find({
            where: [
                {firstName: Like(`%${req.params.query}%`)},
                {lastName: Like(`%${req.params.query}%`)}
            ]
        });

        return res.json(users);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const userWithEmail = await this.repository.findOne({email: req.body.email});
        if (userWithEmail) {
            return res.json({success: false, msg: 'Email already exists'});
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.json({success: false, msg: 'Passwords do not match'});
        }

        const userWithUsername = await this.repository.findOne({username: req.body.username});
        if (userWithUsername) {
            return res.json({success: false, msg: 'Username already exists'});
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
        if ('password' in req.body) {
            if (req.body.password !== req.body.confirmPassword) {
                return res.json({success: false, msg: 'Passwords do not match'});
            }

            req.body.password = await this.CryptoService.hashPassword(req.body.password);
        }

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
        const user = await this.repository.findOne(req.body.id, {relations: ['friends']});
        const friend = await this.repository.findOne(req.body.friendId, {relations: ['friends']});
        if (user && friend) {
            const requestRepo = getRepository(FriendRequest);
            await requestRepo.delete({toId: req.body.id, fromId: req.body.friendId});

            user.friends.push(friend);
            friend.friends.push(user);

            await this.repository.save(user);
            return res.json({success: true}); // user.friends.friends contains user -> circular structure - causes JSON.stringify to error
        }

        return res.json({success: false, msg: 'User or friend not found'});
    }

    private removeFriend = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.body.id, {relations: ['friends']});
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

    private setAvatar = async (req: Request, res: Response): Promise<Response> => {
        const user = await this.repository.findOne(req.body.user);
        if (user && req.file) {
            const avatar = await this.MediaService.saveProfilePicture(req.file, user);            
            user.avatar = avatar.path

            const result = await this.repository.save(user);
            return res.json(result);
        }

        return res.json({success: false, msg: 'User not found or image not found'});
    }

    private getUserMedia = async (req: Request, res: Response): Promise<Response> => {
        const mediaRepo = getRepository(Media);
        const media = await mediaRepo.find({
            path: Like(`%media\\\\${req.params.id}%`)
        });

        return res.json(media);
    }

    private createFriendRequest = async (req: Request, res: Response): Promise<Response> => {
        const requestRepo = getRepository(FriendRequest);
        const requestObj = requestRepo.create(req.body);
        const request = await requestRepo.save(requestObj);

        return res.json(request);
    }

    private getFriendRequests = async (req: Request, res: Response): Promise<Response> => {
        const requestRepo = getRepository(FriendRequest);
        const requests = await requestRepo.find({
            relations: ['from', 'to'],
            where: {toId: parseInt(req.params.id)}
        });

        return res.json(requests);
    }

    private deleteFriendRequest = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.params);
        const requestRepo = getRepository(FriendRequest);
        const result = await requestRepo.delete(req.params.id);

        return res.json(result);
    }

    private hasFriend = async (req: Request, res: Response): Promise<Response> => {
        let hasFriend = false;
        const user = await this.repository.findOne(req.body.id, {relations: ['friends']});
        if (user) {
            hasFriend = user.friends.some(u => u.id === req.body.friendId);
        }

        return res.json({hasFriend});
    }
}