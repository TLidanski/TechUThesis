import { App } from './app';

import express from 'express'
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

import { createConnection, getRepository } from 'typeorm';
import { TypeormStore } from 'typeorm-store';
import { Session } from './entity/Session';

import { UserController } from './controllers/user.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { AuthController } from './controllers/auth.controller';
import { AlbumController } from './controllers/album.controller';
import { ReactionController } from './controllers/reaction.controller';
import { ChatController } from './controllers/chat.controller';

createConnection().then(connection => {
    const app = new App({
        port: 5000,
        controllers: [
            new AuthController(),
            new UserController(),
            new PostController(),
            new CommentController(),
            new AlbumController(),
            new ReactionController(),
            new ChatController()
        ],
        middlewares: [
            express.json(),
            express.static('static'),
            session({
                resave: false,
                saveUninitialized: true,
                store: new TypeormStore({repository: getRepository(Session)}),
                secret: 'Primetime'
            }),
            passport.initialize(),
            passport.session(),
            cors()
        ]
    });
    
    app.listen();
});