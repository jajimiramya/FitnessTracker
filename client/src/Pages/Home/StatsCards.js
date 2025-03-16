const StatsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h3 className="text-gray-600">{item.title}</h3>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
          <div className={`p-3 rounded-full bg-gray-100`}>
            <span className="text-2xl">{item.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;



