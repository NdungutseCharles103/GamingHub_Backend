import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import User from "../models/userModel";

const client = new OAuth2Client(process.env.CLIENT_ID);

 class Authorization {
    public async verifyToken(req: any, _res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        const provider = req.headers.provider;
        if (!token) {
            _res.status(403).json({ message: "No token provided" });
        }
        try {
            if(provider === "google") {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.CLIENT_ID,
                });
                const payload: TokenPayload | any = ticket.getPayload();
                const userid = payload["sub"];
                const user = await User.findOne({ googleId: userid });
                if (!user) {
                    _res.status(403).json({ message: "No token provided" });
                }
                req.user = user;
                next();
            }
            else  {
                const decoded = ((secret = process.env.JWT_SECRET || 'unknown') => {
                    jwt.verify(token, secret);
                })();
                req.user = decoded;
                next();
            }
        } catch (err) {
            _res.status(403).json({ message: "Invalid token" });
        }
    }
}

export default new Authorization();