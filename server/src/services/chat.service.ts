import { NextFunction, Request, Response } from 'express';
import io from 'socket.io';

export class ChatService {
    private io: SocketIO.Server;

    constructor(server: SocketIO.Server) {
        this.io = server;
        this.initConnection();
    }

    private initConnection = () => {
        this.io.on('connection', socket => {
            console.log('Connection established');
        });
    }
}