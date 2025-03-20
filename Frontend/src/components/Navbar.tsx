import React from "react";

const Navbar: React.FC = () => {
  return (
    <div
      className="fixed top-0 bg-gray-900 text-white px-7 py-5 shadow-md"
      style={{ width: "calc(100% - 16rem)", left: "16rem" }}
    >
      {/* Lewa strona - Nawigacja */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold">IoT Dashboard</span>
        </div>

        {/* Prawa strona - Akcje */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-lg">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>

          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md">Profile</button>
          <button className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
