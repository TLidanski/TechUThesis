import express, { Application } from 'express';
import * as server from 'http';
import { Server } from 'socket.io';
import IControllerBase from './interfaces/IControllerBase.interface';

import { ChatService } from './services/chat.service';

export class App {
    private app: Application;
    private port: number;
    private server: server.Server;
    private io;
    private ChatService: ChatService;

    constructor(constructorObj: {port: number, controllers: IControllerBase[], middlewares: any}) {
        this.app = express();
        this.port = constructorObj.port;
        this.server = server.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"],
                credentials: true
            }
        });
        this.ChatService = new ChatService(this.io);

        this.setUpMiddlewares(constructorObj.middlewares);
        this.setUpRoutes(constructorObj.controllers);
    }

    private setUpRoutes = (controllers: IControllerBase[]) => {
        
        for (const controller of controllers) {
            this.app.use('/', controller.router);            
        }
    }

    private setUpMiddlewares = (middlewares: any) => {

        for (const middleware of middlewares) {
            this.app.use(middleware);
        }
    }

    public listen = () => {
        this.server.listen(this.port, () => console.log('Server running on port ' + this.port));
    }
}