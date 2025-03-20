import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/mqtt";
import deviceRoutes from "./routes/deviceRoutes";
import sensorRoutes from "./routes/sensorRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/api", deviceRoutes)
app.use("/api", sensorRoutes)


app.listen(PORT, () => {

    console.log(`Server działa na porcie: ${PORT}`);


   

});

