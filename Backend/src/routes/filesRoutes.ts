import express from "express";
import { filesDownload } from "../controllers/filesControllee";

const router = express.Router();


router.get("/download/devices", filesDownload);


export default router;