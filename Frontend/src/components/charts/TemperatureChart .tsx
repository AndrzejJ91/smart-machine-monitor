import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utlis/axios.Config';

interface DataPoint {
  timestamp: string;
  value: number;
}

const TemperatureChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:3000/api/temperature_sensor');
        const formattedData = response.data.map((item: any) => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          value: item.value,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching temperature data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Machine Temperature</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

