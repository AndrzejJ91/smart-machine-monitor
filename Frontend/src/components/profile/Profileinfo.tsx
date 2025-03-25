import { UserCircle, Mail, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../utlis/axios.Config';

const ProfileInfo = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [lastLogin, setLastLogin] = useState<string>('');

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await api.get('http://localhost:3000/api/user/status');
                setIsActive(response.data.isActive);

                const formattedDate = new Date(response.data.lastLogin).toLocaleString();
                setLastLogin(formattedDate);
            } catch (error) {
                console.error("Error fetching user status:", error);
            }
        }

        fetchUserStatus();
        const interval = setInterval(fetchUserStatus, 30000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="relative bg-gray-800 text-white w-full h-full flex p-8 rounded-xl shadow-md opacity-0 animate-slide-up">
        {/* Profile avatar and basic data */}
        <div className="flex items-center gap-6">
            <div className="p-5">
                <UserCircle size={80} className="text-blue-500" />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold">John Doe</h2>
                <p className="text-gray-400 flex items-center gap-2">
                    <Mail size={18} /> john@example.com
                </p>
                <p className="text-gray-400 flex items-center gap-2">
                    <Activity size={18} /> {lastLogin}
                </p>
            </div>
        </div>
        
        {/* Active status on the right side */}
        <span className={`absolute top-0 right-0 text-sm font-semibold text-white py-2 px-4 m-4 rounded-lg cursor-pointer ${
            isActive ? 'bg-green-600' : 'bg-red-600'}`}>
            {isActive ? "Active" : "Inactive"}
        </span>
    </div>
    
    );
}

export default ProfileInfo;

