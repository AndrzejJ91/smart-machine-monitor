import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import dotenv from "dotenv";
import pool from "../config/db";

dotenv.config();

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body;

    try {
        const [rows]: any = await pool.query('SELECT * FROM users where email = ?', [email]);

        if (rows.length === 0) {
            res.status(401).json({ error: 'Invalid login or password' });
            return;
        }

        const user = rows[0];

        // Checking password correctness
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid login or password' });
            return;
        }

        // Generating token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Function to check user status
export const activeStatus = (req: Request, res: Response) => {

    const lastLogin = new Date(Date.now() - 2 * 60 * 1000);
    const isActive = Date.now() - lastLogin.getTime() < 5 * 60 * 1000;

    res.json({ isActive, lastLogin });
}
