import { App } from './app';
import express from 'express'
import { createConnection } from 'typeorm';

import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';

createConnection().then(connection => {
    const app = new App({
        port: 5000,
        controllers: [
            new UserController(),
            new PostController(),
            new CommentController()
        ],
        middlewares: [
            express.json(),
            express.static('static')
        ]
    });
    
    app.listen();
});