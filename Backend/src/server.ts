import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import logsRoutes from './routes/logsRoutes'
import authRoutes from "./auth/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Adres frontendowy
    credentials: true               // Wymagane, jeśli używasz ciasteczek
  }));
app.use(express.json());



// Logowanie przy starcie
app.listen(PORT, () => {
    console.log(`✅ Server działa na porcie: ${PORT}`);
   
});



// PODŁĄCZANIE TRAS
app.use("/api", authRoutes)
app.use("/api", metricsRoutes);
app.use("/api", logsRoutes)
app.use("/api", deviceRoutes);
app.use("/api", sensorRoutes);

