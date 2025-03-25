import { Request, Response } from "express";
import pool from "../config/db";

// Endpoint for collecting logs (currently from the table)
export const getLogs = async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM logs 
            ORDER BY timestamp DESC 
            LIMIT 100`;

        const [rows] = await pool.query(query);
        res.json(rows);

    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


