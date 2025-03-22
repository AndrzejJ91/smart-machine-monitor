import express from "express";
import { getDevices, updateDeviceConfig } from "../controllers/deviceController";
import {verifyToken} from "../auth/authMiddleware"

const router = express.Router();


router.get("/devices", verifyToken, getDevices);
router.put("/devices/:deviceId",verifyToken, updateDeviceConfig);



export default router;