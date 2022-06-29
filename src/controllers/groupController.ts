import Group from '../models/groupModel';
import { Request, Response, NextFunction } from 'express';


class GroupController {
    async getGroups(_req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await Group.find();
            res.status(200).json(groups);
        } catch (error) {
            next(error);
        }
    }

    async getGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await Group.findById(req.params.id);
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    async createGroup(req: Request, res: Response, next: NextFunction) {
        const { name, description, image } = req.body;
        const newGroup = new Group({ name, description, image });

        try {
            const savedGroup = await newGroup.save();
            res.status(201).json(savedGroup);
        } catch (error) {
            next(error);
        }
    }

    async updateGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    async deleteGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const group = await Group.findByIdAndDelete(req.params.id);
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    async getGroupsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const groups = await Group.find({ users: req.params.user });
            res.status(200).json(groups);
        } catch (error) {
            next(error);
        }
    }
}

export default new GroupController();