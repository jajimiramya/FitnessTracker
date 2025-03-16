import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { axiosInstance } from "../../apicalls";

const WorkoutProgressChart = () => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchWorkoutData = async () => {
        try {
          const response = await axiosInstance.get("/api/workouts");
          const workouts = response.data
            .map((workout) => ({
              date: new Date(workout.date).toLocaleDateString(),
              duration: workout.duration,
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order
      
          setWorkoutData(workouts);
        } catch (error) {
          console.error("Error fetching workout data:", error);
        }
      };

    fetchWorkoutData();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-3">📈 Workout Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={workoutData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Duration (mins)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};




export default WorkoutProgressChart;
