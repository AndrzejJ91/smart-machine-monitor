import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import metricsRoutes from "./routes/metricsRoutes";  // Ważne!
import kurwa from "./routes/Kurwa"
import pool from "./config/db";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Endpoint bezpośrednio w app.get() - BEZ ROUTERA
app.get("/api/metrics", async (req, res) => {
    try {
        console.log("➡️ Pobieram dane metryk...");

        const query = `
            SELECT sensor_name, SUM(value) AS total_value
            FROM sensor_data
            WHERE sensor_name IN ('temperature_sensor', 'performance_sensor', 'load_sensor', 'machine_status', 'working_time')
            GROUP BY sensor_name;
        `;

        const [rows] = await pool.query(query);
        console.log("✅ Dane zwrócone z bazy (bezpośrednio):", rows);

        res.json(rows);
    } catch (error) {
        console.error("❌ Błąd podczas pobierania danych (bezpośrednio):", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

// Logowanie przy starcie
app.listen(PORT, () => {
    console.log(`✅ Server działa na porcie: ${PORT}`);
    console.log(`🟢 Nasłuchuję na: http://localhost:${PORT}/api`);
});

// PODŁĄCZANIE TRAS
app.use("/api", deviceRoutes);
app.use("/api", sensorRoutes);
app.use("/api", kurwa);
