import { useState, useEffect } from "react";
import { saveDailyGoals, fetchDailyGoals } from "../../apicalls/dailygoals";


const userId = localStorage.getItem("userId");
const userToken = localStorage.getItem("token");

const DailyGoals = () => {
  const [goals, setGoals] = useState({
    userId: userId,
    steps: "",
    calories: "",
    water: "",
    workoutDuration: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadGoals = async () => {
      console.log("useEffect triggered - Fetching daily goals");
      const data = await fetchDailyGoals(userToken);
      if (data && !data.error) {
        setGoals(data);
      }
      else {
        console.error("Error loading goals:", data.error);
      }
    };
    loadGoals();
  }, []);
  /*useEffect(() => {
    const loadGoals = async () => {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
  
      if (userId) {
        const data = await fetchDailyGoals(userId, userToken);
        if (data && !data.error) {
          setGoals(data);
        }
      }
    };
    loadGoals();
  }, []);*/
  

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await saveDailyGoals(goals, userToken);
    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("Daily goals saved successfully!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Goals</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Steps Walked</label>
          <input
            type="number"
            name="steps"
            value={goals.steps}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter steps count"
          />
        </div>
        <div>
          <label className="block text-gray-600">Calories Burned</label>
          <input
            type="number"
            name="calories"
            value={goals.calories}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter calories burned"
          />
        </div>
        <div>
          <label className="block text-gray-600">Water Intake (liters)</label>
          <input
            type="number"
            step="0.1"
            name="water"
            value={goals.water}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter liters of water"
          />
        </div>
        <div>
          <label className="block text-gray-600">Workout Duration (minutes)</label>
          <input
            type="number"
            name="workoutDuration"
            value={goals.workoutDuration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter workout duration"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Goals
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};


export default DailyGoals;
