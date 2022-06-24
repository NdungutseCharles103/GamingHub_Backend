import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../middlewares/ErrorHandler';
import Post from '../models/postModel';

class PostController {

    async create(req: Request, res: Response) {
        const post = new Post(req.body);
        try {
            const savedPost = await post.save();
            res.status(201).json(savedPost);
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            // console.log(error);
            // throw new ErrorHandler(500, "Internal server error");
            next(error);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            console.log(error);
        }
    }

    async getByUser(req: Request, res: Response) {
        try {
            const posts = await Post.find({ creatorDetails: req.params.id });
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }

    async getByGroup(req: Request, res: Response) {
        try {
            const posts = await Post.find({ group: req.params.id });
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }

    async getByTag(req: Request, res: Response) {
        try {
            const posts = await Post.find({ tags: req.params.id });
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const posts = await Post.findById(req.params.id);
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PostController();