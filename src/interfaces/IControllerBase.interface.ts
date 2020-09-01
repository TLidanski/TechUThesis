interface IControllerBase {
    path: string;
    router: any;
    initRoutes(): any;
}

export default IControllerBase