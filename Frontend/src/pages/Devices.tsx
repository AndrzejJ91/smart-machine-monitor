
import { useEffect, useState } from 'react';
import { Monitor } from 'lucide-react';
import api from "../utlis/axios.Config"
interface Device {
  id: number;
  name: string;
  config: {
    interval: string;
    unit: string;
  };
  timestamp: string;
}

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/devices');
        const formattedData = response.data.map((item: any) => {
          let configObj;
          
          try {
            configObj = typeof item.config === "string" ? JSON.parse(item.config) : item.config;
          } catch (e) {
            console.error("Błąd parsowania JSON:", e);
            configObj = { interval: "-", unit: "-" }; // Domyślna wartość w razie błędu
          }

          let formattedTimestamp = "Brak daty";
          if(item.created_at) {
            try {
              const date = new Date(item.created_at);
              if(!isNaN(date.getTime())) {
                formattedTimestamp = date.toLocaleString();
              }else {
                console.warn("Nieprawidłowy format daty:", item.created_at);
              }
            }catch (e) {
              console.error("Błąd przetwarzania daty:", e);
            }

          }
           return {
            id: item.id,
            name: item.name,
            config: configObj,
            timestamp: formattedTimestamp
          };
          
        });
     
        setDevices(formattedData);
       
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
   
    fetchData();
  }, []);

  return (
    <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Devices</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
      {devices.map((device) => (
        <div
          key={device.id}
          className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <div className="flex items-center mb-2">
            <Monitor className="text-blue-500 mr-2" size={24} />
            <h3 className="text-xl font-semibold text-gray-800">{device.name}</h3>
          </div>
          <p className="text-gray-600 mb-1">
            Status: <span className="font-medium">Interwał: {device.config.interval}, Jednostka: {device.config.unit}</span>
          </p>
          <p className="text-sm text-gray-400">Last update: {device.timestamp}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Devices;


