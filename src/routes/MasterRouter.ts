import { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRoute';
import messageRouter from './messageRoute';
import groupRouter from './groupRoute';

class MasterRouter {
  private _router = Router();
  private _userRoute = userRouter;
  private _postRoute = postRouter;
  private _messageRoute = messageRouter;
  private _groupRoute = groupRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/user', this._userRoute);
    this._router.use('/post', this._postRoute);
    this._router.use('/message', this._messageRoute);
    this._router.use('/group', this._groupRoute);
  }
}

export = new MasterRouter().router;