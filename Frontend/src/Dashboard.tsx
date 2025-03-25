import { Route, Routes } from "react-router-dom";
import ChartPanel from "./components/charts/ChartPanel";
import MetricsDisplay from "./components/charts/MetricsDisplay";
import SideNavbar from "./components/SideNavbar";
import Devices from "./pages/Devices";
import Sensors from "./pages/Sensors";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Files from "./components/Files"

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <SideNavbar />
      <div className="flex flex-col m-5 w-full">
        <Routes>
          {/* Main dashboard page */}
          <Route path="/" element={
            <>
              <MetricsDisplay />
              <ChartPanel />
            </>
          } />
          {/* Devices page */}
          <Route path="/devices" element={<Devices />} />
          {/* All sensors page */}
          <Route path="/allSensors" element={<Sensors />} />
          {/* Logs page */}
          <Route path="/logs" element={<Logs />} />
          {/* Settings page */}
          <Route path="/settings" element={<Settings />} />
          {/* Profile page under settings */}
          <Route path="settings/profile" element={<Profile />} />

          <Route path="settings/files" element={<Files />} />
        </Routes>
      </div>
    </div>
  );
};


export default Dashboard;


