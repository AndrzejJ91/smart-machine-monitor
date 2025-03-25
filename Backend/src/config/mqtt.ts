import mqtt from "mqtt";
import dotenv from "dotenv";
import pool from "./db";

dotenv.config();

const MQTT_BROKER = process.env.MQTT_BROKER || "mqtt://localhost:1883";
const client = mqtt.connect(MQTT_BROKER);

// Handling MQTT connection
client.on('connect', () => {
    console.log("✅ Connected to MQTT broker");

    client.subscribe("#", (err) => {
        if (err) {
            console.error("❌ Subscription error:", err);
        } else {
            console.log("📡 Subscribed to all topics: (#)");
        }
    });
});

// Receiving MQTT messages and saving to MySQL
client.on("message", async (topic, message) => {
    console.log(`📥 Received MQTT message: ${topic} - ${message.toString()}`);

    try {
        // 🛠 Parsing the message to JSON
        let payloadString = message.toString()
            .replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // Adds quotes to keys
            .replace(/:\s*([a-zA-Z_]+)(?=[,}])/g, ':"$1"');      // Adds quotes to textual values

        let parsedMessage = JSON.parse(payloadString);

        // Extracting device ID from topic (e.g., devices/1/data)
        const deviceMatch = topic.match(/devices\/(\d+)\/config/);
        const sensorMatch = topic.match(/devices\/(\d+)\/data/);

        let deviceId;
        if (deviceMatch) {
            deviceId = parseInt(deviceMatch[1]);
            const { name, config } = parsedMessage;

            await pool.query(
                "INSERT INTO devices (id, name, config) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE name=?, config=?",
                [deviceId, name, config, name, config]
            );

            console.log(`Device saved: ${name} with configuration ${config}`);

        } else if (sensorMatch) {
            deviceId = parseInt(sensorMatch[1]);
            const { sensor_name, value } = parsedMessage;

            await pool.query(
                "INSERT INTO sensor_data (device_id, sensor_name, value) VALUES(?, ?, ?)",
                [deviceId, sensor_name, value]
            );

            console.log(`✅ Data saved: ${sensor_name} = ${value} for device ${deviceId}`);
        } 
        // If message format is unknown
        else {
            await pool.query(
                "INSERT INTO logs (type, source, message, status) VALUES(?, ?, ?, ?)",
                ["unknown_format", topic, message.toString(), "unresolved"]
            );
        }

    } catch (error) {
        console.error("❌ MQTT processing error:", error);

        // Saving faulty message to logs table
        await pool.query(
            "INSERT INTO logs (type, source, message, status) VALUES(?, ?, ?, ?)",
            ["error", topic, message.toString(), "unresolved"]
        );
    }
});

// Handling MQTT client errors
client.on("error", (err) => {
    console.error("❌ MQTT error:", err);
});

export default client;
