import { Request, Response } from "express";
import pool from "../config/db";

// Fetch all devices
export const getDevices = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query("SELECT * FROM devices ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error while fetching devices" });
    }
};

// Update device configuration
export const updateDeviceConfig = async (req: Request, res: Response) => {
    const { deviceId } = req.params;
    const { config } = req.body;

    try {
        await pool.query("UPDATE devices SET config = ? WHERE id = ?", [config, deviceId]);
        res.json({ message: "Configuration updated!" });
    } catch (error) {
        res.status(500).json({ error: "Error while updating configuration" });
    }
};
