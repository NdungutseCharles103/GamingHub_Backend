import { NextFunction, Request, Response } from 'express';
import Visitor from "../models/visitorModel";

class StatsController {
    async getVisitors(_req: Request, res: Response, next: NextFunction) {
        try {
            const visitors = await Visitor.find();
            res.status(200).json(visitors);
        } catch (error) {
            next(error);
        }
    }

    async postVisitor(_req: Request, res: Response, next: NextFunction) {
        try {
            const visitor = await Visitor.create(_req.body);
            res.status(201).json(visitor);
        } catch (error) {
            next(error);
        }
    }
}

export default new StatsController();