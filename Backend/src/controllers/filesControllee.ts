import  {Request, Response} from "express";
import pool from "../config/db";
import fs from "fs";
import path from "path";




// Devices download
export const devicesDownload = async (req: Request, res: Response) => {

   
    try {

    const [rows] = await pool.query(`SELECT * FROM devices
        ORDER BY created_at desc
        LIMIT 100`);
       

        const filesPath = path.join(__dirname, "../../public/files/devices.json");


        const dirPath = path.dirname(filesPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

       


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



// Sensors Download

 export const sensorsDownload = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM sensor_data
            ORDER BY  timestamp DESC
            limit 100`);
        
        const filesPath = path.join(__dirname, "../../public/files/sensors.json");
        
        

        const dirPath = path.dirname(filesPath);
                if(!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, {recursive: true});
                }
            
        fs.writeFileSync(filesPath, JSON.stringify(rows, null, 2));
        
        res.download(filesPath, "sensors.json", (err) => {
            if(err) {
                console.error("Error sending file:", err);
                res.status(500).json({error: "Server error while sending file"});
            }
          
        })



    }catch(error) {
        console.error("Error fetching sensors", error);
        res.status(500).json({error: "Server error while sending file"});

    };

 };


// Logs Download
export const logsDownload = async (req: Request, res: Response) => {
    try {
        console.log("🔧 Rozpoczynam pobieranie logów...");
        
        const [rows]: any = await pool.query(`SELECT * FROM logs
            ORDER BY timestamp DESC
            LIMIT 100`);

        console.log("✅ Logi pobrane z bazy danych:", rows);

        const filePath = path.join(__dirname, "../../public/files/logs.json");
        console.log("🗃️  Ścieżka pliku:", filePath);

        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            console.log("📂 Tworzę katalog:", dirPath);
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Zapisanie pliku przed pobraniem
        fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
        console.log("💾 Plik zapisany na dysku");

        res.download(filePath, "logs.json", (err) => {
            if (err) {
                console.error("❌ Błąd podczas wysyłania pliku:", err);
                res.status(500).json({ error: "Server error while sending file" });
            } else {
                console.log("✅ Plik został pobrany");
            }
        });

    } catch (error) {
        console.error("🔥 Błąd podczas pobierania logów:", error);
        res.status(500).json({ error: "Server error while sending file" });
    }
};

 