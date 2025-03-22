import express from "express";
import { getLogs } from '../controllers/logsControlles'

const router = express.Router();


router.get('/logs', getLogs);

export default router