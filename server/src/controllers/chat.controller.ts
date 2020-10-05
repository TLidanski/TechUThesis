import express, { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import IControllerBase from '../interfaces/IControllerBase.interface';

export class ChatController implements IControllerBase {
    path: string = '/posts';
    router = express.Router();
    // private ChatService: ChatService = new ChatService();

    constructor() {
        this.initRoutes();
    }

    public initRoutes = () => {}
}