import mqtt from "mqtt";
import dotenv from "dotenv";
import pool from "./db";


dotenv.config();



const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://localhost:1883";

const client = mqtt.connect(MQTT_BROKER);


client.on('connect', () => {

    console.log("✅ Połączono z brokerem MQTT");

    client.subscribe("#", (err) => {

        if(err) {
            console.error("❌ Błąd subskrypcji:", err);

        }else {

            console.log("📡 Subskrybowano wszystkie tematy: (#) ");
        }

    }); // Odbieranie zmian konfiguracji

});



// Odbieranie wiadomości MQTT i zapis do MySQL
client.on("message", async (topic, message) => {

    console.log(`📥 Otrzymano MQTT: ${topic} - ${message.toString()}`);

    try {

        // 🛠 Parsowanie wiadomości do JSON
        let payloadString = message.toString()
    .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Dodaje cudzysłowy do kluczy
    .replace(/:\s*([a-zA-Z_]+)(?=[,}])/g, ':"$1"');      // Dodaje cudzysłowy do tekstowych wartości

        let parsedMessage = JSON.parse(payloadString);


        // Pobieramy ID urządzenia z tematu (np. devices/1/data)
        
        const deviceMatch = topic.match(/devices\/(\d+)\/config/);
        const sensorMatch = topic.match(/devices\/(\d+)\/data/);
        
        let deviceId;
        if(deviceMatch) {
            deviceId = parseInt(deviceMatch[1]);
            const {name, config} = parsedMessage;

            await pool.query(
                "INSERT INTO devices (id, name, config) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE name=?, config=?",
                [deviceId, name, config, name, config]
            );

            console.log(`Użadzenie zapisane w : ${name} z konfiguarcja ${config}`)

        }else if (sensorMatch) {
            deviceId = parseInt(sensorMatch[1])
            const {sensor_name, value} = parsedMessage;

            await pool.query("INSERT INTO sensor_data (device_id, sensor_name, value) VALUES(?, ?, ?)", [deviceId, sensor_name, value]);

            console.log(`✅ Dane zapisane: ${sensor_name} = ${value} dla urządzenia ${deviceId}`);
        }
             // Jeśli wiadomość jest w nieznanym formacie

        else {
            await pool.query("INSERT INTO logs (type, source, message, status) VALUES(?, ?, ?, ?)",
                ["unknown_format",topic, message.toString(),"unresolved"]
            );

        }
 
    }catch(error) {
        console.error("❌ Błąd przetwarzania MQTT:", error);

        // Zapis błędnej wiadomości do tabeli logs
        await pool.query(
            "INSERT INTO logs (type, source, message, status) VALUES(?, ?, ?, ?)",
            ["error", topic, message.toString(), "unresolved"]
        );

    }



});





client.on("error", (err) => {
    console.error("❌ Błąd MQTT:", err);

})


export default client;