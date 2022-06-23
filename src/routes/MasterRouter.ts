import { Router } from 'express';
import userRouter from './userRoute';

class MasterRouter {
  private _router = Router();
  private _userRoute = userRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use('/user', this._userRoute);
  }
}

export = new MasterRouter().router;