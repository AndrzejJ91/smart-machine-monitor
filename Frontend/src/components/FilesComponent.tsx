import { LucideIcon } from 'lucide-react';
import api from '../utlis/axios.Config';


interface Fiels {
    title: String
    description: String
    Icon: LucideIcon
    Download: LucideIcon
}

const MessageComponent:React.FC<Fiels> = ({Icon, Download, title, description}) => {

  const downloadFiles = async () => {
    
    try{
      const response = await api.get('/download/devices', {responseType: "blob"})
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'devices.json');
      document.body.appendChild(link);
      link.click();
      link.remove();

    }catch(error) {
      console.error("Error downloading file:", error);

    }

  }


  return (
    <div className="bg-gray-700 text-white p-6 w-64 h-64 rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 cursor-pointer flex flex-col justify-center items-center transform hover:scale-105 animate-slide-up"
         onClick={downloadFiles} 
    >
    <div className="flex flex-col items-center mb-4">
        <Icon size={48} className="text-blue-500 mb-2" />
        <h3 className="text-2xl font-semibold"> {title} </h3>
    </div>
    <div className='flex gap-2 items-center'>
        <p className="text-center text-md text-gray-300"> {description} </p>
        <Download size={24} className="text-blue-500 hover:text-blue-400 transition-transform duration-200 hover:rotate-12" />
    </div>
</div>

  )
}

export default MessageComponent
