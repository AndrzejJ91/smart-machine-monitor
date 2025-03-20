import express, { Request, Response } from "express";
import pool from "../config/db";

const router = express.Router();

router.get('/metrics', async (req: Request, res: Response) => {
    try {
        console.log("➡️ Pobieram dane metryk...");
        
        const [rows] = await pool.query(`
            SELECT sensor_name, value, timestamp
            FROM sensor_data
            WHERE sensor_name IN ('temperature_sensor', 'performance_sensor', 'load_sensor', 'machine_status', 'working_time')
            ORDER BY timestamp DESC
            LIMIT 20;
        `);

        console.log("✅ Dane zwrócone z bazy:", rows);  // Log danych z bazy
        res.json(rows);  // Zwracamy dane do frontendu
    } catch (error) {
        console.error("❌ Błąd podczas pobierania danych:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


export default router;