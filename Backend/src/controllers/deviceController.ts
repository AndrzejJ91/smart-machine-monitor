import { Request, Response } from "express";
import pool from "../config/db";


// Pobierz wszystkie urządzenia


export const getDevices = async (req: Request, res: Response) => {

    try {

        const [rows] = await pool.query("SELECT * FROM devices ORDER BY created_at DESC");
            res.json(rows)

    }catch(error) {
        res.status(500).json({error: "Błąd podczas pobierania urządzeń"});

    };

};


// Aktualizuj konfigurację urządzenia

export const updateDeviceConfig = async (req: Request, res: Response) =>{

    const {deviceId} = req.params;
    const {config} = req.body;


    try {
        await pool.query("UPDATE devices SET config = ? WHERE id = ?", [config,deviceId])
            res.json({ message: "Konfiguracja zaktualizowana!" });

    }catch(error) {
        res.status(500).json({error:"Błąd podczas aktualizacji"});

    };

};