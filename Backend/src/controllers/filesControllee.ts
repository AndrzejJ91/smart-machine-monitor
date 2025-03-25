import  {Request, Response} from "express";
import pool from "../config/db";
import fs from "fs";
import path from "path";





export const filesDownload = async (req: Request, res: Response) => {

   
    try {

    const [rows] = await pool.query(`SELECT * FROM devices
        ORDER BY created_at desc
        LIMIT 100`);
       

        const filesPath = path.join(__dirname, "../../public/files/devices.json");


        const dirPath = path.dirname(filesPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(filesPath, JSON.stringify(rows, null, 2));


        res.download(filesPath, "devices.json", (error) => {
            if(error) {
                console.error("Error sending file:", error);
                res.status(500).json({error: "Server error while sending file"});
            };

        });
        

    }catch(error) {
        console.error(console.error('Error fetching devices:', error));
        res.status(500).json({error: 'Server error' });

    };

};

