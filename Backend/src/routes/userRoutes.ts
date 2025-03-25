import express from "express";
import { verifyToken } from "../auth/authMiddleware";
import { changePassword } from "../controllers/userController";


const router = express.Router();


router.put('/user/change-password', verifyToken, changePassword);

export default router;