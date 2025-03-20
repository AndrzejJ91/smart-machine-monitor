import express, { Request, Response } from "express";
const router = express.Router();

router.get('/kurwa', async (req: Request, res: Response) => {
    console.log("➡️ Rozpoczynam pobieranie danych metryk...");
    res.send("🔧 Testowy endpoint działa!");
});

export default router;