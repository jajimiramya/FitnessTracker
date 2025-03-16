const { axiosInstance } = require(".");


// ✅ Fetch all users' badges
export const getUserBadges = async () => { // No userId needed here
    try {
      const response = await axiosInstance.get(`/api/motivation/badges`);
      console.log("Fetched Badges Data:", response.data);
      return response.data; // Returns an array of objects [{userId, badges}, {userId, badges}, ...]
    } catch (error) {
      console.error("Error fetching badges:", error);
      return [];
    }
};


// Fetch all success stories
export const getSuccessStories = async () => {
    try {
      const response = await axiosInstance.get("/api/motivation/stories");
      console.log("Fetched Success Stories:", response.data);
  
      // Extract stories from each user object
      const allStories = response.data.flatMap(user => user.stories || []);
      
      console.log("Extracted Stories:", allStories); // Debugging
      return allStories; 
    } catch (error) {
      console.error("Error fetching success stories:", error);
      return [];
    }
  };

//Fetch Streak Data in API File

export const getWorkoutStreak = async (userId, range = "today") => {
  try {
    const response = await axiosInstance.get(`/workouts/streaks/${userId}?range=${range}`);
    console.log(`Streak for ${range}:`, response.data); // ✅ Debugging log
    return response.data; // Should return { streak: X }
  } catch (error) {
    console.error(`Error fetching workout streak for ${range}:`, error);
    return { streak: 0 }; // Default to 0 if API fails
  }
};

  
