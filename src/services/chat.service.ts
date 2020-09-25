import { NextFunction, Request, Response } from 'express';
import io from 'socket.io';

export class ChatService {
    private io: SocketIO.Server = io(5000);

    constructor() {
        this.initConnection();
    }

    private initConnection = () => {
        this.io.on('connection', socket => {

        });
    }
}