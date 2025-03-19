import mysql from "mysql2/promise";
import dotenv from "dotenv";




dotenv.config();


const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'iiot_user',
    password: process.env.DB_PASSWORD || "iiot_db123",
    database: process.env.DB_NAME || 'iiot_db',
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});

// ✅ Sprawdzenie połączenia przy starcie serwera
pool.getConnection()
    .then(() => console.log("✅ Połączono z MySQL"))
    .catch((err) => console.error("❌ Błąd MySQL:", err));


export default pool;