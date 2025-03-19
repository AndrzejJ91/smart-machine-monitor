import mqtt from "mqtt";
import dotenv from "dotenv";
import pool from "./db";


dotenv.config();



const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://localhost:1883";

const client = mqtt.connect(MQTT_BROKER);


client.on('connect', () => {

    console.log("✅ Połączono z brokerem MQTT");

    client.subscribe("devices/+/data", (err) => {

        if(err) {
            console.error("❌ Błąd subskrypcji:", err);

        }else {

            console.log("📡 Subskrybowano temat: devices/+/config");
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


        // Pobieramy ID urządzenia z tematu (np. devices/1/data)
        
        const match = topic.match(/devices\/(\d+)\/data/);
        if(!match) return console.log("⚠️ Zły format tematu MQTT");

        const deviceId = parseInt(match[1]);

        const {sensor_name, value} = JSON.parse(payloadString);

         // Zapisujemy dane do tabeli `sensor_data`

         await pool.query(
            "INSERT INTO sensor_data (device_id, sensor_name, value) VALUES(?, ?, ?)",
            [deviceId, sensor_name, value]
         )


         console.log(`✅ Dane zapisane: ${sensor_name} = ${value} dla urządzenia ${deviceId}`);
    }catch(error) {
        console.error("❌ Błąd przetwarzania MQTT:", error);

    }



});





client.on("error", (err) => {
    console.error("❌ Błąd MQTT:", err);

})


export default client;