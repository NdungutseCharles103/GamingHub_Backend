import Message from '../models/messageModel';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../middlewares/ErrorHandler';

class MessageController {

    public async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }

    public async postMessage(req: Request, res: Response, next: NextFunction) {
        const { author, text, room, room1, to } = req.body;
        const newMessage = new Message({ author, text, room, room1, to });
        try {
            const savedMessage = await newMessage.save();
            res.status(201).json(savedMessage);
        } catch (error) {
            next(error);
        }

    }

    public async getMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await Message.findById(req.params.id);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    public async updateMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    public async deleteMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await Message.findByIdAndDelete(req.params.id);
            res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    public async getMessagesByRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const messages = await Message.find({ room: req.params.room });
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }

    public async getMessagesByRoom1(req: Request, res: Response, next: NextFunction) {
        try {
            const messages = await Message.find({ room1: req.params.room1 });
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }
}

export default new MessageController();