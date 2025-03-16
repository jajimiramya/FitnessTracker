import React, { useState, useEffect } from "react";
import { fetchDailySummary } from "../apicalls/dailySummaryApi";
import { getMeals } from "../apicalls/nutritionApi"; // ✅ Import meals API

const DailySummary = ({ userId }) => {
  const [summary, setSummary] = useState({
    caloriesConsumed: 0,
    caloriesBurned: 0,
    workoutsDone: 0,
    streakStatus: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        // ✅ Fetch the main daily summary
        const data = await fetchDailySummary(userId);
        if (data) setSummary(data);

        // ✅ Fetch Calories Consumed (from nutrition API)
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedMeals = await getMeals(token);
          const today = new Date().toISOString().split("T")[0];
          const todayMeals = fetchedMeals.filter(meal => meal.timestamp.startsWith(today));

          const totalCalories = todayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
          setSummary(prev => ({ ...prev, caloriesConsumed: totalCalories }));
        }

        // ✅ Fetch Calories Burned from /api/daily-goals/today
        const goalsRes = await fetch("http://localhost:8082/api/daily-goals/today", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const goalsData = await goalsRes.json();
        if (goalsData.length > 0) {
          setSummary(prev => ({ ...prev, caloriesBurned: goalsData[0].calories }));
        }
      } catch (err) {
        console.error("Error fetching daily summary data:", err);
      }
      setLoading(false);
    };

    getSummary();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-500">Loading daily summary...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Daily Summary</h2>
      <div className="grid grid-cols-4 gap-6 text-center w-full">
        <div className="bg-gray-100 p-6 rounded-lg w-full">
          <p className="text-sm text-gray-500">Calories Consumed</p>
          <p className="text-xl font-bold">{summary.caloriesConsumed} kcal</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg w-full">
          <p className="text-sm text-gray-500">Calories Burned</p>
          <p className="text-xl font-bold">{summary.caloriesBurned} kcal</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg w-full">
          <p className="text-sm text-gray-500">Workouts Done</p>
          <p className="text-xl font-bold">{summary.workoutsDone}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg w-full">
          <p className="text-sm text-gray-500">Streak Status</p>
          <p className="text-xl font-bold">{summary.streakStatus} days</p>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
