import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../entity/ChatMessage';
import { ChatRoom } from '../entity/ChatRoom';

import IControllerBase from '../interfaces/IControllerBase.interface';

export class ChatController implements IControllerBase {
    path: string = '/chat';
    router = express.Router();
    private AuthService: AuthService = new AuthService();
    private roomRepository = getRepository(ChatRoom);
    private messageRepository = getRepository(ChatMessage);

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {
        this.router.get(this.path + '/messages/:firstId/:secondId', this.AuthService.isAuthenticated, this.getMessages);
    }

    private getMessages = async (req: Request, res: Response): Promise<Response> => {
        const room = await this.roomRepository.findOne({
            where: [
                {name: `${req.params.firstId}-${req.params.secondId}`},
                {name: `${req.params.secondId}-${req.params.firstId}`}
            ]
        });
        
        if (room) {
            const messages = await this.messageRepository.find({
                relations: ['author'],
                where: {roomId: room.id}
            });

            return res.json(messages);
        }

        return res.json({success: false, msg: 'There are no messages'});
    }
}