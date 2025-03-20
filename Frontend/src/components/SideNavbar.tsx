import { Home, Settings, BarChart, Activity, FileText } from 'lucide-react';

const SideNavbar = () => {
  return (
    <div className="bg-gray-700 h-screen w-64 rounded-xl shadow-lg p-5">
      {/* Logo i nazwa */}
      <div className="w-full h-16 flex justify-center items-center mb-5">
        <h1 className="text-gray-100 font-bold text-2xl">IoT Dashboard</h1>
      </div>

      {/* Separator */}
      <div className="border-b border-gray-500 my-3"></div>

      {/* Opcje menu */}
      <div className="w-full h-4/6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
          <Home className="text-gray-200" size={20} />
          <span className="font-semibold text-gray-200">Devices</span>
        </div>

        <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
          <Activity className="text-gray-200" size={20} />
          <span className="font-semibold text-gray-200">Sensors</span>
        </div>

        <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
          <BarChart className="text-gray-200" size={20} />
          <span className="font-semibold text-gray-200">Performance</span>
        </div>

        <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
          <FileText className="text-gray-200" size={20} />
          <span className="font-semibold text-gray-200">Logs</span>
        </div>

        <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
          <Settings className="text-gray-200" size={20} />
          <span className="font-semibold text-gray-200">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;


