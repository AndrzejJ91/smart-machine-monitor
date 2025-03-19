import express from "express";
import { getDevices, updateDeviceConfig } from "../controllers/deviceController";


const router = express.Router();


router.get("/devices", getDevices);
router.put("/devices/:deviceId", updateDeviceConfig);



export default router;