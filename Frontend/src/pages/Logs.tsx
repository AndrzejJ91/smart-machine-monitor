
import  { useEffect, useState } from 'react'
import api from "../utlis/axios.Config"
interface Logs {
    id: number,
    type: String,
    source: String,
    message: String,
    status: String,
    timestamp: string

}

const Logs = () => {

    const [logs, setLogs] = useState<Logs[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try{
                const response = await api.get('http://localhost:3000/api/logs');

            setLogs(response.data);


            }catch(error) {
                console.error("Error fetching logs", error);

            };
            
        };

        fetchData()
    },[])


  return (
    <div className="overflow-auto rounded-lg shadow-md">
  <table className="w-full table-auto">
    <thead className="bg-gray-100 text-left">
      <tr>
        <th className="px-4 py-2">Timestamp</th>
        <th className="px-4 py-2">Type</th>
        <th className="px-4 py-2">Source</th>
        <th className="px-4 py-2">Message</th>
        <th className="px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {logs.map((log) => (
        <tr key={log.id} className="border-t hover:bg-gray-50">
          <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
          <td className="px-4 py-2">{log.type}</td>
          <td className="px-4 py-2">{log.source}</td>
          <td className="px-4 py-2">{log.message}</td>
          <td className="px-4 py-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              log.status === 'unresolved' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
            }`}>
              {log.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}

export default Logs
