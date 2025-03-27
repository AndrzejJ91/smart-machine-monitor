import express from "express";
import { devicesDownload, logsDownload, sensorsDownload } from "../controllers/filesControllee";

const router = express.Router();


router.get("/download/devices", devicesDownload);
router.get("/download/sensors", sensorsDownload);
router.get("/download/logs", logsDownload)
export default router;