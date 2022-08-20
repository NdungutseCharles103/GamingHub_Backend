import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../middlewares/ErrorHandler";
import bcrypt from "bcrypt";

class userController {
    async getUsers(_req: Request, res: Response) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            
        }
    }

    async getUserByEmail (req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.params.email });
            res.status(200).json(user);
        } catch (error) {
            
        }
    }

    async getUserByGoogleId(req: Request, res: Response) {
        try {
            const user = await User.findOne({ googleId: req.params.id });
            res.status(200).json(user);
        } catch (error) {
            
        }
    }

    async createUser(req: Request, res: Response) {
        console.log(req.body);
        const { name, email, password } = req.body
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            res.status(400).json({ message: "Email already exists" });
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name,  email, password: hashedPassword })

        try {
            const savedUser = await newUser.save();
            res.status(201).json({user: savedUser, message: "User created"});
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }

    async registerWithGoogle(req: Request, res: Response) {
        console.log(req.body);
        const { name, email, picture, googleId } = req.body;
        const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            res.status(400).json({ message: "Email already exists" });
            return
        }
        const newUser = new User({ name, email, picture, googleId });
        try {
            await newUser.save();
            res.status(201).json({ message: "User created" });
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.json({ message: "User not found"});
                return;
            }
            const isValidPassword =((pass=user?.password || 'unknown')=> {
               return bcrypt.compare(req.body.password, pass);
            })()
            if (!isValidPassword) {
                res.json({ message: "Invalid password"});
                return;
            }
            const token = ((secret = process.env.JWT_SECRET || 'unknown') => {
              return  jwt.sign({ id: user?._id, email: user?.email, name: user?.name },
                    secret, { expiresIn: "3d" });
            })();

            res.status(200).json({ message: "Login success", token: token });
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }

    async loginGoogle(req: Request, res: Response) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.status(400).json({ message: "User not found" });
                return
            }
            const token = ((secret = process.env.JWT_SECRET || 'unknown') => {
               return jwt.sign({ id: user?._id, email: user?.email, name: user?.name },
                    secret, { expiresIn: "31d" });
            })();
            console.log(token);
            res.status(200).json({ message: "Login success", token: token });
        } catch (error) {
            res.status(500).json({message: "Something went wrong"});
            
        }
    }
}

export = new userController();
