import React, { useEffect, useState } from "react";
import { fetchWorkouts, deleteWorkout } from "../../apicalls/workouts";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = await fetchWorkouts();
      setWorkouts(data);
    };
    loadWorkouts();
  }, []);

  const handleDelete = async (id) => {
    await deleteWorkout(id);
    setWorkouts(workouts.filter(workout => workout._id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts found.</p>
      ) : (
        workouts.map((workout) => (
          <div key={workout._id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">{workout.type}</h3>
            <p className="text-gray-600">Duration: {workout.duration} min</p>
            <p className="text-gray-600">Intensity: {workout.intensity}</p>
            <p className="text-gray-500 text-sm">
              {new Date(workout.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => handleDelete(workout._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutList;
