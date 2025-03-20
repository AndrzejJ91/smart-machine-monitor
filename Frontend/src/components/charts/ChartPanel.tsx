
import LoadChart from './LoadChart'
import PerformanceChart from './PerformanceChart'
import TemperatureChart from './TemperatureChart '

const ChartPanel = () => {
  return (
    <div className='bg-white w-full h-4/6 rounded-xl mt-3 p-6 shadow-lg'>
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Wykresy Danych</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105'>
        <TemperatureChart />
      </div>
      <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105'>
        <PerformanceChart />
      </div>
      <div className='p-4 bg-gray-50 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105'>
        <LoadChart />
      </div>
    </div>
  </div>
  )
}

export default ChartPanel
