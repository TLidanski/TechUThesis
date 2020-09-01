import express, {Application} from 'express';
import IControllerBase from './interfaces/IControllerBase.interface';

export class App {
    public app: Application;
    public port: number;

    constructor(constructorObj: {port: number, controllers: IControllerBase[], middlewares: any}) {
        this.app = express();
        this.port = constructorObj.port;

        this.setUpRoutes(constructorObj.controllers);
        this.setUpMiddlewares(constructorObj.middlewares);
    }

    private setUpRoutes = (controllers: IControllerBase[]) => {
        
        for (const controller of controllers) {
            this.app.use('/', controller.router);            
        }
    }

    private setUpMiddlewares = (middlewares: any) => {

        for (const middleware of middlewares) {
            console.log(middleware);
            this.app.use(middleware);
        }
    }

    public listen = () => {
        this.app.listen(this.port, () => console.log('Server running on port ' + this.port));
    }
}