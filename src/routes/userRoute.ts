import { Router } from 'express';
import userController from '../controllers/userController';
import authorization from '../middlewares/authorization';

class userRouter {
    private _router = Router();
    private _controller = userController;
    private _auth = authorization.verifyToken;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', this._auth, this._controller.getUsers);
        this._router.get('/:id', this._auth, this._controller.getUser);
        this.router.post('/newUser/google', this._controller.registerWithGoogle);
        this.router.post('/login/google', this._controller.loginGoogle);
        this._router.post('/newUser', this._controller.createUser);
        this._router.post('/login', this._controller.login);
        this._router.put('/:id', this._auth, this._controller.updateUser);
        this._router.delete('/:id', this._auth, this._controller.deleteUser);
    }
}

export = new userRouter().router;
