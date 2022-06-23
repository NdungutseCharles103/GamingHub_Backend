import { Router } from 'express';
import userController from '../controllers/userController';

class userRouter {
    private _router = Router();
    private _controller = userController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', this._controller.getUsers);
        this._router.get('/:id', this._controller.getUser);
        this._router.post('/newUser', this._controller.createUser);
        this._router.put('/:id', this._controller.updateUser);
        this._router.delete('/:id', this._controller.deleteUser);
    }
}

export = new userRouter().router;
