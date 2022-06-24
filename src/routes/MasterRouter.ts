import { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRoute';

class MasterRouter {
  private _router = Router();
  private _userRoute = userRouter;
  private _postRoute = postRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/user', this._userRoute);
    this._router.use('/post', this._postRoute);
  }
}

export = new MasterRouter().router;