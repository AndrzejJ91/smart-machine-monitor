import { Home, Settings, BarChart, Activity, FileText, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SideNavbar = () => {

  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token")
    navigate('/');

  };


  return (
    <div className="bg-gray-700 h-screen w-64 rounded-xl shadow-lg p-5">
      {/* Logo i nazwa */}
      <Link to="/dashboard">
        <div className="w-full h-16 flex justify-center items-center mb-5">
          <h1 className="text-gray-100 font-bold text-2xl">IoT Dashboard</h1>
        </div>
      </Link>

      {/* Separator */}
      <div className="border-b border-gray-500 my-3"></div>

      {/* Opcje menu */}
      <div className="w-full h-4/6 flex flex-col items-center gap-2">
        
        {/* Devices */}
        <Link to="/dashboard/devices" className='w-full'>
          <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
            <Home className="text-gray-200" size={20} />
            <span className="font-semibold text-gray-200">Devices</span>
          </div>
        </Link>

        {/* Sensors */}
        <Link to="/dashboard/allSensors" className='w-full'>
          <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
            <Activity className="text-gray-200" size={20} />
            <span className="font-semibold text-gray-200">Sensors</span>
          </div>
        </Link>

        {/* Performance */}
        <Link to="/dashboard/performance" className='w-full'>
          <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
            <BarChart className="text-gray-200" size={20} />
            <span className="font-semibold text-gray-200">Performance</span>
          </div>
        </Link>

        {/* Logs */}
        <Link to="/dashboard/logs" className='w-full'>
          <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
            <FileText className="text-gray-200" size={20} />
            <span className="font-semibold text-gray-200">Logs</span>
          </div>
        </Link>

        {/* Settings */}
        <Link to="/dashboard/settings" className='w-full'>
          <div className="flex items-center gap-3 justify-start bg-gray-600 hover:bg-gray-500 rounded-lg w-full px-4 py-3 cursor-pointer transition duration-300">
            <Settings className="text-gray-200" size={20} />
            <span className="font-semibold text-gray-200">Settings</span>
          </div>
        </Link>

      </div>
      <div className="w-full">
  <button
    onClick={handelLogout}
    className="w-full flex items-center gap-3 justify-start bg-blue-800 hover:bg-blue-700 rounded-lg px-4 py-3 cursor-pointer transition duration-300"
  >
    <LogOut className="text-white" size={20} />
    <span className="font-semibold text-white">Logout</span>
  </button>
</div>
    </div>
  );
};

export default SideNavbar;



