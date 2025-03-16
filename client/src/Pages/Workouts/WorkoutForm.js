import React, { useState } from "react";
import { axiosInstance } from "../../apicalls"; // Adjusted import path
import { addWorkout } from "../../apicalls/workouts";

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    intensity: "Medium",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/workouts", formData);
      onWorkoutAdded(); // Refresh workouts list
      setFormData({ type: "", duration: "", intensity: "Medium", date: "" }); // Reset form
    } catch (error) {
      console.error("Error adding workout", error);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (!userId) {
      console.error("User ID not found in local storage!");
      return;
    }
  
    const workoutData = { ...formData, userId }; // Include userId in the request
  
    try {
      console.log("Sending workout data:", workoutData); // Debugging step
      await addWorkout(workoutData); // Use the correct API function
      onWorkoutAdded(); // Refresh workout list
      setFormData({ type: "", duration: "", intensity: "Medium", date: "" }); // Reset form
    } catch (error) {
      console.error("Error adding workout", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-3">Add Workout</h2>

      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Workout Type"
        required
        className="w-full border rounded-md p-2 mb-2"
      />

      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration (mins)"
        required
        className="w-full border rounded-md p-2 mb-2"
      />

      <select
        name="intensity"
        value={formData.intensity}
        onChange={handleChange}
        className="w-full border rounded-md p-2 mb-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border rounded-md p-2 mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
        Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
