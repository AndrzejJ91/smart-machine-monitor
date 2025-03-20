

const MetricsDisplay = () => {
  // Przykładowe dane
  const metrics = [
    { label: 'Temperatura', value: '65°C', color: 'bg-red-500' },
    { label: 'Wydajność (%)', value: '40%', color: 'bg-blue-500' },
    { label: 'Stan Maszyny', value: 'Online', color: 'bg-green-500' },
    { label: 'Czas Pracy', value: '120h', color: 'bg-yellow-500' },
    { label: 'Errors', value: '3', color: 'bg-orange-500' },
  ];

  return (
    <div className="bg-gray-100 w-full h-42 flex items-center border border-b rounded-xl mt-10 justify-around">
      {metrics.map((metric, index) => (
        <div key={index} className={`w-48 h-28 ${metric.color} mx-4 rounded-xl flex flex-col justify-center items-center`}>
          <span className="text-white text-lg font-semibold">{metric.label}</span>
          <span className="text-white text-2xl font-bold">{metric.value}</span>
        </div>
      ))}
    </div>
  );
};

export default MetricsDisplay;