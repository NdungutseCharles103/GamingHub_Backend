import Message from '../models/messageModel';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middlewares/ErrorHandler';

class MessageController {

    private async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }
}