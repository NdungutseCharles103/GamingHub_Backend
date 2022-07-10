import { Router } from 'express';
import { registerDefinition } from 'swaggiffy';
import statsController from '../controllers/statsController';

class statsRouter {
    private _router = Router();
    private _controller = statsController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/visitors', this._controller.getVisitors);
    }
}

registerDefinition(new statsRouter().router, { tags: 'Stats', mappedSchema: 'Visitor', basePath: '/stats' });

export = new statsRouter().router;
