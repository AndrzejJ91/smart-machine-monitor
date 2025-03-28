import express from "express";
import {getAllMessags, updateMessagesStatus} from '../controllers/messagesAll'
import { verifyToken } from "../auth/authMiddleware";

const router = express.Router();



router.get("/messages", verifyToken, getAllMessags);
router.put("/messages/:source/:id/status", verifyToken, updateMessagesStatus);

export default router;