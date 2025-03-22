import express from "express";
import pool from "../config/db";
import { getSensorData, getSensors } from "../controllers/sensorsController";


const router = express.Router();


// Endpoint ogólny (dane wszystkich sensorów)

router.get('/allSensors', getSensors);

// Endpoint dynamiczny (dane pojedynczego sensora)
router.get('/:sensorName', getSensorData);


export default router;
