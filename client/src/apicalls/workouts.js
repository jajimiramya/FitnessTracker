import { axiosInstance } from ".";

// Fetch all workouts
export const fetchWorkouts = async () => {
  try {
    const response = await axiosInstance.get("api/workouts");
    return response.data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return []; // Return empty array on error
  }
};

// Add a new workout
export const addWorkout = async (payload) => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in local storage!");
      return null;
    }

    console.log("User ID:", userId); // Debugging step

    const workoutData = { ...payload, userId };

    console.log("Workout Data Sent:", workoutData); // Debugging step

    const response = await axiosInstance.post("api/workouts", workoutData);
    return response.data;
  } catch (error) {
    console.error("Error adding workout:", error);
    return null;
  }
};



// Delete a workout by ID
export const deleteWorkout = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/workouts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting workout:", error);
    return null;
  }
};

// Update a workout by ID
export const updateWorkout = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/workouts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error);
    return null;
  }
};
