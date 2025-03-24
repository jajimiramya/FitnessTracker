import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../apicalls"; // Adjusted import path
import WorkoutForm from "./WorkoutForm"; // Adjusted import

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchWorkouts = async () => {
    try {
      const response = await axiosInstance.get("/api/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.error("Error fetching workouts", error);
    }
  };

  

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Filter workouts based on search input
  const filteredWorkouts = workouts.filter((workout) =>
    workout.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Workouts</h1>

      {/* Workout Form */}
      <WorkoutForm onWorkoutAdded={fetchWorkouts} />

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search workouts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-md p-2 my-4"
      />

      {/* Workouts List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-3">Workout History</h2>
        {/*<ul>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <li key={workout._id} className="p-2 border-b">
                <strong>{workout.type}</strong> - {workout.duration} mins - {workout.intensity} -{" "}
                {new Date(workout.date).toDateString()}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No workouts found</p>
          )}
        </ul>*/}


        {filteredWorkouts.length > 0 ? (

          <table className="w-full border-collapse border border-gray-300">

            <thead>

              <tr className="bg-gray-200">

                <th className="border border-gray-300 p-2">Workout Type</th>

                <th className="border border-gray-300 p-2">Duration (mins)</th>

                <th className="border border-gray-300 p-2">Intensity</th>

                <th className="border border-gray-300 p-2">Date</th>

              </tr>

            </thead>

            <tbody>

              {filteredWorkouts.map((workout) => (

                <tr key={workout._id} className="text-center border border-gray-300">

                  <td className="border border-gray-300 p-2">{workout.type}</td>

                  <td className="border border-gray-300 p-2">{workout.duration}</td>

                  <td className="border border-gray-300 p-2">{workout.intensity}</td>

                  <td className="border border-gray-300 p-2">{new Date(workout.date).toDateString()}</td>

                </tr>

              ))}

            </tbody>

          </table>

        ) : (

          <p className="text-gray-500">No workouts found</p>

        )}
      </div>
    </div>
  );
};

export default WorkoutsPage; 
