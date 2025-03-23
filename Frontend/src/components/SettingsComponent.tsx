import { LucideIcon } from 'lucide-react';

import React from 'react';
import { useNavigate } from 'react-router-dom';
interface Settings {
    title: string;
    description: string;
    icon: LucideIcon;
    path: string
}

const SettingsComponent: React.FC<Settings> = ({ title, description, icon: Icon, path }) => {

    const navigate = useNavigate();

    const handelClick = () => {
        navigate(path)

    }


    return (
        <div
            onClick={handelClick}
            className="bg-gray-700 text-white p-6 w-64 h-64 rounded-2xl shadow-md hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 cursor-pointer flex flex-col justify-center items-center transform hover:scale-105"
        >
            <div className="flex flex-col items-center mb-4">
                <Icon size={48} className="text-blue-500 mb-2" />
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>
            <p className="text-center text-sm text-gray-300">{description}</p>
        </div>
    );
};

export default SettingsComponent;

