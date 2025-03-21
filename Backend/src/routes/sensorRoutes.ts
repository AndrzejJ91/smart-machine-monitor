import express, { Request, Response } from "express";
import pool from "../config/db";


const router = express.Router();




// Uniwersalny endpoint do pobierania danych z różnych sensorów
router.get('/:sensorName', async (req: Request, res: Response) => {
    const sensorName = req.params.sensorName;

    try {
        // Query do pobrania danych na podstawie nazwy sensora
        const [rows] = await pool.query(
            'SELECT value, timestamp FROM sensor_data WHERE sensor_name = ? ORDER BY timestamp DESC LIMIT 20',
            [sensorName]
        );
        
        res.json(rows);
    } catch (err) {
        console.error(`Błąd podczas pobierania danych dla ${sensorName}:`, err);
        res.status(500).json({ error: 'Błąd serwera' });
    }
});

export default router;
