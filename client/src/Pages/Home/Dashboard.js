import React, { useState } from "react";
import StatsCards from "./StatsCards";
import RecentWorkouts from "../Workouts/RecentWorkouts";
import UpcomingWorkouts from "../Workouts/UpcomingWorkouts"; 
import WorkoutProgressChart from "../Workouts/WorkoutProgressChart";
import DailyGoals from "./DailyGoals";
//import DailyGoals from "../Goals/DailyGoals";
import FitnessTipsMotivation from "./FitnessTipsMotivation";
import DateRangeFilter from "./DateRangeFilter";
import { Dumbbell, Flame, CalendarCheck } from "lucide-react";
import MotivationCarousel from "../../Components/QuotesCarousel";
import MotivationAchievements from "../../Components/MotivationAchievements";
import DailySummary from "../../Components/DailySummary";


const Dashboard = () => {
  const [selectedRange, setSelectedRange] = useState("Today");
  const userId = localStorage.getItem("userId"); // Get userId from local storage
 
  return (
    <div className="p-6">

<MotivationCarousel />


   

<DailySummary userId={userId} />

     

      {/* 🏋️ Recent Workouts & Daily Goals */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* 💪 Recent Workouts */}
        <div className="w-full md:w-1/2 bg-white p-5 rounded-xl shadow-lg">
          <RecentWorkouts />
        </div>

        {/* ✅ Daily Goals */}
        <div className="w-full md:w-1/2 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">🥇 Daily Goals</h2>
          <DailyGoals />
          </div>
         
      </div>

      {/* 📅 Upcoming Workouts & Progress Chart */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* 🏃 Upcoming Workouts */}
        <div className="w-full md:w-1/2 bg-white p-5 rounded-xl shadow-lg">
          <UpcomingWorkouts />
        </div>

        {/* 📈 Progress Chart */}
        <div className="w-full md:w-1/2 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Progress Chart</h2>
          <WorkoutProgressChart />
        </div>
      </div>

      {/* 🎯 Fitness Motivation 
<div className="mt-6">
  {/* <FitnessTipsMotivation /> 
</div> */}

      <div className="mt-6">
        <MotivationAchievements />
      </div>

      
    </div>
  );
};

export default Dashboard;
