

const SideNavbar = () => {
  return (
    <div className="bg-gray-800 h-screen w-64 rounded-xl">
      {/* Logo i nazwa */}
      <div className="w-full h-16 flex justify-center items-center">
        <h1 className="text-white font-bold text-2xl">IoT Dashboard</h1>
      </div>

      {/* Separator */}
      <div className="border-b border-gray-700 my-3"></div>

      {/* Opcje menu */}
      <div className="w-full h-4/6 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full w-4/5 my-2 cursor-pointer transition duration-200">
          <span className="font-bold py-3 text-white">Devices</span>
        </div>

        <div className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full w-4/5 my-2 cursor-pointer transition duration-200">
          <span className="font-bold py-3 text-white">Sensors</span>
        </div>

        <div className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full w-4/5 my-2 cursor-pointer transition duration-200">
          <span className="font-bold py-3 text-white">Settings</span>
        </div>

        <div className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-full w-4/5 my-2 cursor-pointer transition duration-200">
          <span className="font-bold py-3 text-white">Logs</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;


