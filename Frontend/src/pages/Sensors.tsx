
import { useEffect, useState } from 'react';
import { ActivitySquare } from 'lucide-react';
import api from "../utlis/axios.Config"
interface Sensors {
  id: number;
  device_id: number;
  sensor_name: string;
  value: number;
  timestamp: string;
}

const Sensors = () => {
  const [sensors, setSensors] = useState<Sensors[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/allSensors');
        
        const formattedData = response.data.map((item: any) => ({
          id: item.id,
          device_id: item.device_id,
          sensor_name: item.sensor_name,
          value: item.value,
          timestamp: new Date(item.timestamp).toLocaleString(),
        }));

        setSensors(formattedData);
      } catch (error) {
        console.error("Error fetching sensors", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 opacity-0 animate-slide-up">
  <h2 className="text-2xl font-bold mb-6">Sensors</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
    {sensors.map((sensor, index) => (
      <div
        key={index}
        className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl 
        transition duration-500 ease-in-out transform hover:scale-105 
        opacity-0 animate-fade-in"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <ActivitySquare className="text-green-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold">{sensor.sensor_name}</h3>
          </div>
          <span className="text-xs text-gray-400">Device ID: {sensor.device_id}</span>
        </div>
        <p className="text-gray-600">Value: <span className="font-medium">{sensor.value}</span></p>
        <span className="text-sm text-gray-400">{sensor.timestamp}</span>
      </div>
    ))}
  </div>
</div>

  );
};

export default Sensors;

