import express from "express";
import { getSensorData, getSensors } from "../controllers/sensorsController";
import { verifyToken } from "../auth/authMiddleware";

const router = express.Router();

// General endpoint (data from all sensors)
router.get('/allSensors', getSensors);

// Dynamic endpoint (data from a single sensor)
router.get('/:sensorName', verifyToken, getSensorData);

export default router;

