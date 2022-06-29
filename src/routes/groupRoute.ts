import { Router } from 'express';
import groupController from '../controllers/groupController';


class groupRouter {
    private _router = Router();
    private _controller = groupController;

    constructor() {
        this._configure();
    }

    get router() {
        return this._router;
    }

    private _configure() {
        this._router.get('/', this._controller.getGroups);
        this._router.post('/', this._controller.createGroup);
        this._router.get('/:id', this._controller.getGroup);
        this._router.put('/:id', this._controller.updateGroup);
        this._router.delete('/:id', this._controller.deleteGroup);
        this._router.get('/user/:user', this._controller.getGroupsByUser);
    }
}

export default new groupRouter().router;