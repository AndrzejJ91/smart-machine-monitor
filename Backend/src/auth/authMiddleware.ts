
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface CustomRequest extends Request {
    user?: any;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) {
        res.status(401).json({error:'Brak tokena, brak dostępu'});
        return;
    };

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decode;
        next();
    } catch(error) {
        res.status(403).json({error: 'Nieprawidłowy token' });
        return;
    }
}



