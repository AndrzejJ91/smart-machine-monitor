import express, { Request, Response } from "express";
import pool from "../config/db";

const router = express.Router();

router.get('/metrics', async (req: Request, res: Response) => {
    console.log("🟡 Pool in router:", pool ? "Connection is working" : "No connection");

    try {
        console.log("➡️ Fetching metrics data...");

        const query = `
            SELECT sensor_name, ROUND(AVG(value), 2) AS average_value
            FROM sensor_data
            WHERE sensor_name IN ('temperature_sensor', 'performance_sensor', 'load_sensor', 'machine_status', 'working_time')
            GROUP BY sensor_name;
        `;

        const [rows] = await pool.query(query);
        console.log("✅ Data returned from the database (directly):", rows);
        res.json(rows);

    } catch (error) {
        console.error("❌ Error while fetching data (directly):", error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;



