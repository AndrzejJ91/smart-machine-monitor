import  { useState } from 'react';
import Profileinfo from '../components/profile/Profileinfo';

const tabs = ["Profile Info", "Change Password", "Preferences", "Activity Log"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="flex flex-col gap-4">
        
        {/* Zakładki (Tabs) */}
        <div className="flex space-x-4 border-b border-gray-300 pb-2 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-lg font-semibold py-2 px-4 rounded-t-lg cursor-pointer ${
                activeTab === index ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Treść zakładki */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-64">
          {activeTab === 0 && <Profileinfo />}
          {activeTab === 1 && <div>Change Password Content</div>}
          {activeTab === 2 && <div>Preferences Content</div>}
          {activeTab === 3 && <div>Activity Log Content</div>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
