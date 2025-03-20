import ChartPanel from "./charts/ChartPanel"
import MetricsDisplay from "./MetricsDisplay"
import SideNavbar from "./SideNavbar"


const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
    <SideNavbar />
    <div>
    <MetricsDisplay />
    <ChartPanel />
    </div>
    
    
    </div>
    
  )
}

export default Dashboard
