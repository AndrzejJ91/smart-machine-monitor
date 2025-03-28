import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import logsRoutes from './routes/logsRoutes';
import authRoutes from "./auth/authRoutes";
import userRoutes from "./routes/userRoutes";
import filesDownloadRoutes from "./routes/filesDownloadRoutes"
import messagesRoutes from "./routes/messagesRoutes"
import "./config/mqtt";
import path from "path";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Frontend address
    credentials: true               // Required if using cookies
}));

app.use(express.json());

app.use("/files",express.static(path.join(__dirname, "public/files")));



// Logging on startup
app.listen(PORT, () => {
    console.log(`✅ Server is running on port: ${PORT}`);
});

// ROUTE CONNECTIONS
app.use("/api", authRoutes);
app.use("/api", messagesRoutes)
app.use("/api", userRoutes);
app.use("/api", metricsRoutes);
app.use("/api", logsRoutes);
app.use("/api", deviceRoutes);
app.use("/api", sensorRoutes);
app.use("/api", filesDownloadRoutes)

