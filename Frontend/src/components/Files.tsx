
import { File, Download  } from 'lucide-react'
import FilesComponent from './FilesComponent'


const filesData = [
  {title: "All Data", description: "Download yours all data", icon: File, iconDownload: Download},
  {title: "Metrics", description: "Download Mertrics data", icon: File, iconDownload: Download},
  {title: "Sensors", description: "Download Sensors data", icon: File, iconDownload: Download},
  {title: "Devces", description: "Download Devices data", icon: File, iconDownload: Download},
  {title: "Errors", description: "Download Errors", icon: File, iconDownload: Download},
  {title: "Logs", description: "Download logs", icon: File, iconDownload: Download}

]

const SaveFile = () => {

  
  return (
    <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6'> FIles to download</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filesData.map((data, index) => (
            <FilesComponent 
              key={index}
              title={data.title}
              description={data.description}
              Icon={data.icon}
              Download={data.iconDownload}
            />
 
          ))}
          
        </div>
        
      
    </div>
  )
}

export default SaveFile
