import express from "express";

import { getSensorData, getSensors } from "../controllers/sensorsController";
import { verifyToken } from "../auth/authMiddleware";


const router = express.Router();


// Endpoint ogólny (dane wszystkich sensorów)

router.get('/allSensors', getSensors);

// Endpoint dynamiczny (dane pojedynczego sensora)
router.get('/:sensorName',verifyToken, getSensorData);


export default router;
