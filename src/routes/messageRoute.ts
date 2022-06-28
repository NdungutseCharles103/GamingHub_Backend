import { Router, Request, Response, NextFunction } from 'express';
import messageController from '../controllers/messageController';

class messageRoute {
    private _router = Router();
    private _messageController = messageController;

    constructor() {
        this._configure();
    }

    get router() {
        return this._router;
    }

    private _configure() {
        this._router.get('/', this._messageController.getAll);
        this._router.post('/', this._messageController.postMessage);
        this._router.get('/:id', this._messageController.getMessage);
        this._router.put('/:id', this._messageController.updateMessage);
        this._router.delete('/:id', this._messageController.deleteMessage);
        this._router.get('/room/:room', this._messageController.getMessagesByRoom);
    }
}