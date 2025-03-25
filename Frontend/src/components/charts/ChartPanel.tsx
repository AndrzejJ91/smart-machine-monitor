
import LoadChart from './LoadChart'
import PerformanceChart from './PerformanceChart'
import TemperatureChart from './TemperatureChart '

const ChartPanel = () => {
  return (
    <div className='bg-white w-full h-4/6 rounded-xl mt-3 p-6 shadow-lg opacity-0 animate-slide-up'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Data Charts</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Temperature Chart */}
        <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-slide-up delay-100'>
          <TemperatureChart />
        </div>

        {/* Performance Chart */}
        <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-slide-up delay-200'>
          <PerformanceChart />
        </div>

        {/* Load Chart */}
        <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-slide-up delay-300'>
          <LoadChart />
        </div>
      </div>
    </div>
  );
}

export default ChartPanel;
