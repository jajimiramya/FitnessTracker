
//not using this file
const Navbar = () => {
    return (
      <nav className="bg-green-500 h-16 flex items-center justify-between px-6 shadow-lg">
        <h1 className="text-white text-2xl font-bold">🏋️‍♀️ Fitness Tracker</h1>
        <ul className="flex">
          <li className="p-4 hover:bg-gray-700 cursor-pointer">🏠 Dashboard</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">💪 Workouts</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">🥗 Nutrition</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">📊 Progress</li>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">🎯 Goals</li>
        </ul>
        <button className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-100">
          Logout
        </button>
      </nav>
    );
  };
  
  export default Navbar;
  