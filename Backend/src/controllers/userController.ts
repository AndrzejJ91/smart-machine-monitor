import bcrypt from "bcrypt";
import pool from "../config/db";
import { Request, Response } from "express";

export const changePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = (req as any).user.id;
    
    try {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const user = rows[0];

        // Checking the correctness of the old password
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);

        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid old password' });
            return;
        }

        // Hashing the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Updating the password in the database
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

        res.json({ message: 'Password changed successfully' });
        
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ error: 'Server error while changing password' });
    }
}
