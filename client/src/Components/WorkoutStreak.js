import { useEffect, useState } from "react";
import { getWorkoutStreak } from "../apicalls/motivationApi";

const WorkoutStreak = ({ userId }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const data = await getWorkoutStreak(userId);
        setStreak(data.streak);
      } catch (error) {
        console.error("Failed to load workout streak", error);
      }
    };

    if (userId) {
      fetchStreak();
    }
  }, [userId]);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold">🔥 Workout Streak</h2>
      <p className="text-2xl font-bold text-blue-600">{streak} days</p>
    </div>
  );
};

export default WorkoutStreak;
