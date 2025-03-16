import { useEffect, useState } from "react";
import { Dumbbell, Flame, CalendarCheck } from "lucide-react";
import { getWorkoutStreak } from "../apicalls/motivationApi"; // Import API function
import StatsCards from "../Pages/Home/StatsCards"; // Import StatsCards component

const StatsSection = ({ userId }) => {
  const [streaks, setStreaks] = useState({
    today: 0,
    last7days: 0,
    last30days: 0,
  });

  const [statsData, setStatsData] = useState({
    Today: [
      { title: "Total Workouts", value: 15, icon: <Dumbbell stroke="blue" className="w-8 h-8" /> },
      { title: "Calories Burned", value: 1000, icon: <Flame stroke="red" className="w-8 h-8" /> },
      { title: "Active Days", value: 0, icon: <CalendarCheck stroke="green" className="w-8 h-8" /> }, // Placeholder
    ],
    "Last 7 Days": [
      { title: "Total Workouts", value: 75, icon: <Dumbbell stroke="blue" className="w-8 h-8" /> },
      { title: "Calories Burned", value: 750, icon: <Flame stroke="red" className="w-8 h-8" /> },
      { title: "Active Days", value: 0, icon: <CalendarCheck stroke="green" className="w-8 h-8" /> }, // Placeholder
    ],
    "Last 30 Days": [
      { title: "Total Workouts", value: 120, icon: <Dumbbell stroke="blue" className="w-8 h-8" /> },
      { title: "Calories Burned", value: 3000, icon: <Flame stroke="red" className="w-8 h-8" /> },
      { title: "Active Days", value: 0, icon: <CalendarCheck stroke="green" className="w-8 h-8" /> }, // Placeholder
    ],
  });

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const todayStreak = await getWorkoutStreak(userId, "today");
        const last7DaysStreak = await getWorkoutStreak(userId, "7days");
        const last30DaysStreak = await getWorkoutStreak(userId, "1month");

        setStreaks({
          today: todayStreak.streak,
          last7days: last7DaysStreak.streak,
          last30days: last30DaysStreak.streak,
        });

        // Update statsData with the fetched streak values
        setStatsData((prevData) => ({
          ...prevData,
          Today: prevData.Today.map((item) =>
            item.title === "Active Days" ? { ...item, value: todayStreak.streak } : item
          ),
          "Last 7 Days": prevData["Last 7 Days"].map((item) =>
            item.title === "Active Days" ? { ...item, value: last7DaysStreak.streak } : item
          ),
          "Last 30 Days": prevData["Last 30 Days"].map((item) =>
            item.title === "Active Days" ? { ...item, value: last30DaysStreak.streak } : item
          ),
        }));
      } catch (error) {
        console.error("Failed to load workout streaks", error);
      }
    };

    if (userId) {
      fetchStreaks(); // Fetch all streaks when userId is available
    }
  }, [userId]);

  return (
    <div>
      <h2 className="text-lg font-bold">Workout Stats</h2>
      <StatsCards data={statsData.Today} />
      <StatsCards data={statsData["Last 7 Days"]} />
      <StatsCards data={statsData["Last 30 Days"]} />
    </div>
  );
};

export default StatsSection;
