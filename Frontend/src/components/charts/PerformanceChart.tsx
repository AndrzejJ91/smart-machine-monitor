
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utlis/axios.Config';



interface DataPoint {
  timestamp: String,
  value: number

}

const PerformanceChart: React.FC = () => {

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await api.get('http://localhost:3000/api/performance_sensor');
        const formattedData = response.data.map((item: any) => ({
          timestamp: new Date(item.timestamp).toLocaleTimeString(),
          value: item.value

        }));

        setData(formattedData);
       
      }catch(error) {
        console.error("bląd danych wydajności maszyn", error);

      };
      
    }
    fetchData();
    const interval = setInterval(fetchData,5000);
    return () => clearInterval(interval)

  },[]);


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Wydajność Maszyny</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
