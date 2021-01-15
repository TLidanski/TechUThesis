import express, { Request, Response } from 'express';
import { getRepository, In } from 'typeorm';

import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { MediaService } from '../services/media.service';
import { AuthService } from '../services/auth.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class PostController implements IControllerBase {
    path: string = '/posts';
    router = express.Router();
    private relations = ['user', 'comments', 'comments.author', 'comments.reactions',  'comments.reactions.user', 'comments.replies', 'comments.replies.author', 'comments.replies.reactions', 'comments.replies.reactions.user', 'reactions', 'reactions.user', 'media'];
    private maxMediaNumber: number = 12;
    private repository = getRepository(Post);
    private MediaService: MediaService = new MediaService();
    private AuthService: AuthService = new AuthService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/all/:userId/:skip/:take', this.AuthService.isAuthenticated, this.get);
        this.router.get(this.path + '/:id', this.AuthService.isAuthenticated, this.getById);
        this.router.get(this.path + '/user/:id', this.AuthService.isAuthenticated, this.getUserPosts);
        this.router.post(this.path, this.AuthService.isAuthenticated, this.MediaService.upload.array('media', this.maxMediaNumber), this.create);
        this.router.post(this.path + '/share', this.AuthService.isAuthenticated, this.share);
        this.router.delete(this.path + '/:id', this.AuthService.isAuthenticated, this.delete);
    }

    private get = async (req: Request, res: Response): Promise<Response> => {
        const userIdArr: number[] = [parseInt(req.params.userId)];
        const userRepo = getRepository(User);
        const user = await userRepo.findOne(req.params.userId, {
            relations: ['friends']
        });
        if (user) {
            for (const friend of user.friends) {
                userIdArr.push(friend.id);
            }
        }

        const posts = await this.repository.find({
            relations: this.relations,
            where: {userId: In(userIdArr)},
            order: {createdAt: 'DESC'},
            skip: parseInt(req.params.skip),
            take: parseInt(req.params.take)
        });

        return res.json(posts);
    }

    private getById = async (req: Request, res: Response): Promise<Response> => {
        const post = await this.repository.findOne(
            req.params.id,
            {relations: this.relations}
        );
        return res.json(post);
    }

    private getUserPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.repository.find({
            relations: this.relations,
            where: {userId: req.params.id},
            order: {createdAt: 'DESC'}
        });

        return res.json(posts);
    }

    private create = async (req: Request, res: Response): Promise<Response> => {
        const postData = {
            ...req.body,
            media: await this.MediaService.saveMedia(Object.values(req.files))
        }

        const newPost = this.repository.create(postData);
        const result = await this.repository.save(newPost);

        return res.json(result);
    }

    private delete = async (req: Request, res: Response): Promise<Response> => {
        const result = await this.repository.delete(req.params.id);
        return res.json(result);
    }

    private share = async (req: Request, res: Response): Promise<Response> => {
        const post = req.body.post;
        let newPost = new Post();
        newPost.user = req.body.user;
        newPost.text = post.text;
        newPost.media = post.media;
        
        const result = await this.repository.save(newPost);
        return res.json(result);
    }
}