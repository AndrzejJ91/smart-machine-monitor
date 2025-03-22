import { Route, Routes } from "react-router-dom";
import ChartPanel from "./components/charts/ChartPanel";
import MetricsDisplay from "./components/charts/MetricsDisplay";
import SideNavbar from "./components/SideNavbar";
import Devices from "./pages/Devices";
import Sensors from "./pages/Sensors";
import Logs from "./pages/Logs";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      <SideNavbar />
      <div className="flex flex-col m-5 w-full">
        <Routes>
          {/* Główna strona dashboardu */}
          <Route path="/" element={
            <>
              <MetricsDisplay />
              <ChartPanel />
            </>
          } />
          {/* Podstrona urządzeń */}
          <Route path="/devices" element={<Devices />} />
          <Route path="/allSensors" element={<Sensors />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;


