import express from "express";
import {activeStatus, login} from './authController';


const router = express.Router();


router.post('/login', login);
router.get('/user/status', activeStatus)

export default router;