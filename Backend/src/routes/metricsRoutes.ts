import express, {Request, Response} from "express"
import pool from "../config/db";



const router = express.Router();


router.get('/metrics', async (req: Request, res: Response) => {
    console.log("🟡 Pool w routerze:", pool ? "Połączenie działa" : "Brak połączenia");

    try {
        console.log("➡️ Pobieram dane metryk...");

        const query = `
            SELECT sensor_name, ROUND(AVG(value), 2) AS average_value
            FROM sensor_data
            WHERE sensor_name IN ('temperature_sensor', 'performance_sensor', 'load_sensor', 'machine_status', 'working_time')
            GROUP BY sensor_name;
        `;

        const [rows] = await pool.query(query);
        console.log("✅ Dane zwrócone z bazy (bezpośrednio):", rows);
        res.json(rows)

    }catch (error) {
        console.error("❌ Błąd podczas pobierania danych (bezpośrednio):", error);
        res.status(500).json({ error: "Błąd serwera" });
     };

});


export default router;


