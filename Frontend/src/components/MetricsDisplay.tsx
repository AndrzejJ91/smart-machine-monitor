import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Metric {
  label: string;
  value: string;
  color: string;
}

const MetricsDisplay: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Funkcja do pobierania danych metryk
  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/metrics');
      
      
      const formattedMetrics = response.data.map((item: any) => {
        let label = '';
        let color = '';
    
        switch (item.sensor_name) {
            case 'temperature_sensor':
                label = 'Temperatura';
                color = 'bg-red-500';
                break;
            case 'performance_sensor':
                label = 'Wydajność (%)';
                color = 'bg-blue-500';
                break;
            case 'load_sensor':
                label = 'Obciążenie';
                color = 'bg-green-500';
                break;
            case 'machine_status':
                label = 'Stan Maszyny';
                color = 'bg-yellow-500';
                break;
            case 'working_time':
                label = 'Czas Pracy';
                color = 'bg-orange-500';
                break;
            default:
                label = 'Unknown';
                color = 'bg-gray-500';
                break;
        }
    
        return {
            label,
            value: String(item.total_value),  // Zamiast item.value
            color,
        };
    });
      
      setMetrics(formattedMetrics);
      
    } catch (error) {
      console.error("Błąd podczas pobierania danych metryk:", error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white w-full h-48 flex items-center justify-around border border-gray-200 rounded-xl shadow-lg p-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`w-48 h-28 ${metric.color} mx-4 rounded-xl shadow-md 
          flex flex-col justify-center items-center 
          transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer`}
        >
          <span className="text-white text-lg font-semibold">{metric.label}</span>
          <span className="text-white text-2xl font-bold">{metric.value}</span>
        </div>
      ))}
    </div>
  );
};

export default MetricsDisplay;
