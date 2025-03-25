import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
    user?: any;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if the token exists
    if (!token) {
        res.status(401).json({ error: 'No token, access denied' });
        return;
    }

    try {
        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
        return;
    };
};




