import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler";

 class Authorization {
    public static async verifyToken(req: any, _res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            throw new ErrorHandler(401, "No token provided");
        }
        try {
            const decoded = ((secret = process.env.JWT_SECRET || 'unknown') => {
                jwt.verify(token, secret);
            })();
            req.user = decoded;
            next();
        } catch (err) {
            throw new ErrorHandler(401, "Invalid token");
        }
    }
}

export default new Authorization();