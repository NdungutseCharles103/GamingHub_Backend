import User from "../models/userModel";
// import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import ErrorHandler from "../middlewares/ErrorHandler";

class userController{
 async  getUsers (_req: Request, res: Response, next: NextFunction) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

async getUser  (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

 async createUser (req: Request, res: Response, next: NextFunction) {
    const {name, username, email, password} = req.body
    const newUser = new User({name, username, email, password})

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
}

async updateUser  (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

 async deleteUser (req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

//  async login (req: Request, res: Response, next: NextFunction) {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             throw new ErrorHandler(401, "User not found");
//         }
//         const isValidPassword = await User.findOne({email: req.body.password});
//         if (!isValidPassword) {
//             throw new ErrorHandler(401, "Invalid password");
//         }
//         const token = jwt.sign({ id: user._id, email: user.email, username: user.username, name: user.name}, 
//             process.env.JWT_SECRET, { expiresIn: "3d" });
//         res.status(200).json({ token });
//     } catch (error) {
//         next(error);
//     }
// }
}

export = new userController();
