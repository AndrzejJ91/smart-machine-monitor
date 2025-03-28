import {Request, Response} from "express";
import pool from "../config/db";
import { RowDataPacket } from "mysql2";

// Interfejs dla urządzeń
interface Devices extends RowDataPacket {
    id: string;
    name: string;
    config: string;
    created_at: string;
    source?: string;
}

// Interfejs dla czujników
interface Sensors extends RowDataPacket {
    id: string;
    data: string;
    timestamp: string;
    source?: string;
}

// Interfejs dla logów
interface Logs extends RowDataPacket {
    id: string;
    message: string;
    created_at: string;
    source?: string;
}

export const getAllMessags = async (req: Request, res: Response) => {

    try {

        const [devicesRows]: [Devices[], any] = await pool.query(`
            SELECT id, name, config, created_at
            FROM devices
        `);

        const [sensorsRows]: [Sensors[], any] = await pool.query(`
            SELECT id, sensor_name, timestamp
            FROM sensor_data
        `);

        const [logsRows]: [Logs[], any] = await pool.query(`
            SELECT id, message, timestamp
            FROM logs
        `);


        console.log("Logs:", logsRows);
        // Łączenie wyników w jeden zbiór
        const allRows = [
            ...devicesRows.map((row) => ({ ...row, source: "Devices" })),
            ...sensorsRows.map((row) => ({ ...row, source: "Sensors" })),
            ...logsRows.map((row) => ({ ...row, source: "Logs" })),
        ];

        console.log("All Rows:", allRows);
        

        res.json(allRows)

    }catch(error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Server error while fetching messages" });
    }


}


export const updateMessagesStatus = async (req: Request, res: Response) => {
    const { id, source } = req.params;
    const { isRead } = req.body;

    try {
        let tableName = "";

        switch (source) {
            case "Devices":
                tableName = "devices";
                break;
            case "Sensors":
                tableName = "sensor_data";
                break;
            case "Logs":
                tableName = "logs";
                break;
            default:
                res.status(400).json({ error: "Invalid source" });
        }

        await pool.query(`UPDATE ${tableName} SET isRead = ? WHERE id = ?`, [isRead ? 1 : 0, id]);

        const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);

       

        res.json({ message: `Message marked as ${isRead ? "read" : "unread"}` });
    } catch (error) {
        console.error("Error updating message status:", error);
        res.status(500).json({ error: "Server error while updating message status" });
    }
};