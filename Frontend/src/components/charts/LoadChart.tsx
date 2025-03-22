
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utlis/axios.Config';



interface DataPoint {
  timestamp: String,
  value: number

}

const LoadChart: React.FC = () => {

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await api.get('http://localhost:3000/api/load_sensor');
        const formattedData = response.data.map((item: any) => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          value: item.value,
        }));

        setData(formattedData)
      } catch (error) {

        console.error("Błąd danych obciażenia Maszyn", error)
      }

    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)

  }, []);


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Obciążenie Maszyny</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadChart;
