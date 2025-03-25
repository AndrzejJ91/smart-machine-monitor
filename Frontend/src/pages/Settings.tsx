
import SettingsComponent from "../components/SettingsComponent";
import { User, MessageCircle, File, Bell, MapPin } from 'lucide-react';


const SettingData = [
    {title: "User Profil", description:"Manage your personal data and password", icon: User, path: "/dashboard/settings/profile"},
    {title: "Messages", description: "View and manage your messages", icon: MessageCircle, path: "/dashboard/settings/messages"},
    {title: "Files", description: "Access uploaded files and documents", icon: File, path: "/dashboard/settings/files" },
    {title: "Alerts", description: "View critical system alerts", icon: Bell, path:"/alerts" },
    {title: "Map View", description: "Track device locations", icon : MapPin, path: "/map"}
]


const Settings = () => {
  return (
    <div className="p-8 opacity-0 animate-slide-up">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SettingData.map((data, index) => (
          <SettingsComponent
            key={index}
            title={data.title}
            description={data.description}
            icon={data.icon}
            path={data.path}
           
          />
        ))}
      </div>
    </div>
  )
}

export default Settings
