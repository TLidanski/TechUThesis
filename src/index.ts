import {App} from './app';
import express from 'express'
import {createConnection} from 'typeorm';

import {UserController} from './controllers/user.controller';

const app = new App({
    port: 5000,
    controllers: [
        new UserController()
    ],
    middlewares: [
        express.json()
    ]
});

createConnection().then(connection => {
    app.listen();
});