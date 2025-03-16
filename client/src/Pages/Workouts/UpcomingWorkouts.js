import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../apicalls";
import { deleteWorkout, updateWorkout } from "../../apicalls/workouts";

const UpcomingWorkouts = () => {
  const [upcomingWorkouts, setUpcomingWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUpcomingWorkouts = async () => {
      try {
        const response = await axiosInstance.get("/api/workouts");
        const workouts = response.data;
        const today = new Date();

        const upcoming = workouts
          .filter((w) => new Date(w.date) > today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);

        setUpcomingWorkouts(upcoming);
      } catch (error) {
        console.error("Error fetching upcoming workouts", error);
      }
    };

    fetchUpcomingWorkouts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    await deleteWorkout(id);
    setUpcomingWorkouts(upcomingWorkouts.filter((workout) => workout._id !== id));
  };

  // Handle Edit
  const handleEdit = (workout) => {
    setEditingWorkout(workout._id);
    setUpdatedData({ type: workout.type, duration: workout.duration, intensity: workout.intensity });
  };

  // Handle Update
  const handleUpdate = async (id) => {
    await updateWorkout(id, updatedData);
    setUpcomingWorkouts(
      upcomingWorkouts.map((workout) =>
        workout._id === id ? { ...workout, ...updatedData } : workout
      )
    );
    setEditingWorkout(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700 mb-3">📅 Upcoming Workouts</h2>
      {upcomingWorkouts.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Workout Type</th>
              <th className="border border-gray-300 p-2">Duration (mins)</th>
              <th className="border border-gray-300 p-2">Intensity</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingWorkouts.map((workout) => (
              <tr key={workout._id} className="border border-gray-300">
                {editingWorkout === workout._id ? (
                  <>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={updatedData.type}
                        onChange={(e) => setUpdatedData({ ...updatedData, type: e.target.value })}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        value={updatedData.duration}
                        onChange={(e) => setUpdatedData({ ...updatedData, duration: e.target.value })}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        value={updatedData.intensity}
                        onChange={(e) => setUpdatedData({ ...updatedData, intensity: e.target.value })}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{new Date(workout.date).toDateString()}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleUpdate(workout._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 p-2">{workout.type}</td>
                    <td className="border border-gray-300 p-2">{workout.duration}</td>
                    <td className="border border-gray-300 p-2">{workout.intensity}</td>
                    <td className="border border-gray-300 p-2">{new Date(workout.date).toDateString()}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleEdit(workout)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(workout._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No upcoming workouts</p>
      )}
    </div>
  );
};

export default UpcomingWorkouts;
