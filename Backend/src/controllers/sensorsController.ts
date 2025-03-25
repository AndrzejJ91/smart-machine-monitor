import { Request, Response } from "express";
import pool from "../config/db";

// Universal endpoint for fetching data from various sensors
export const getSensorData = async (req: Request, res: Response) => {
    const sensorName = req.params.sensorName;

    try {
        // Query to fetch data based on the sensor name
        const [rows] = await pool.query(
            'SELECT value, timestamp FROM sensor_data WHERE sensor_name = ? ORDER BY timestamp DESC LIMIT 20',
            [sensorName]
        );
        
        res.json(rows);
    } catch (err) {
        console.error(`Error while fetching data for ${sensorName}:`, err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch all sensors
export const getSensors = async (req: Request, res: Response) => {
    try {
        const query = `SELECT sensor_name, value, timestamp, device_id
        FROM sensor_data
        ORDER BY timestamp DESC
        LIMIT 100`;

        const [rows] = await pool.query(query);
        res.json(rows);

    } catch (error) {
        console.error("Error fetching all sensor data:", error);
        res.status(500).json({ error: "Server error" });
    }
};

