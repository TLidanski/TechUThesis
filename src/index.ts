import { App } from './app';
import express from 'express'
import { createConnection } from 'typeorm';

import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';

createConnection().then(connection => {
    const app = new App({
        port: 5000,
        controllers: [
            new UserController(),
            new PostController()
        ],
        middlewares: [
            express.json()
        ]
    });
    
    app.listen();
});