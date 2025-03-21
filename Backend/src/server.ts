import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import deviceRoutes from "./routes/deviceRoutes";
import sensorRoutes from "./routes/sensorRoutes";
import metricsRoutes from "./routes/metricsRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



// Logowanie przy starcie
app.listen(PORT, () => {
    console.log(`✅ Server działa na porcie: ${PORT}`);
   
});



// PODŁĄCZANIE TRAS
app.use("/api", metricsRoutes);
app.use("/api", deviceRoutes);
app.use("/api", sensorRoutes);

