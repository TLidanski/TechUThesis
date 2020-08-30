import express, {Application, Request, Response, NextFunction} from 'express';

export class App {
    public app: Application;
    public port: number;

    constructor(constructorObj: {port: number}) {
        this.app = express();
        this.port = constructorObj.port;
    }

    public listen = () => {
        this.app.listen(this.port, () => console.log('Server running on port ' + this.port))
    }
}