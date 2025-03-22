import express from "express";
import { getLogs } from '../controllers/logsControlles'
import { verifyToken } from "../auth/authMiddleware";

const router = express.Router();


router.get('/logs',verifyToken, getLogs);

export default router