import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { initializeApp } from 'firebase-admin/app';
import User from "../models/userModel";
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// import serviceAccount from './firebase.json';
// const account: any = serviceAccount;

// admin.initializeApp({
//     credential: admin.credential.cert(account)
//   });
class Authorization {
    public async verifyToken(req: any, _res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        // const provider = req.headers.provider;
        if (!token) {
            _res.status(403).json({ message: "No token provided" });
            return
        }
        /** 
        *@param token: string
        */
        try {
                const decoded = ((secret = process.env.JWT_SECRET || 'unknown') => {
                    jwt.verify(token, secret);
                })();
                console.log(decoded);
                req.user = decoded;
                next();
        } catch (err) {
            console.log(err);
            _res.status(403).json({ message: "Invalid token" });
        }
    }
}

export default new Authorization();
