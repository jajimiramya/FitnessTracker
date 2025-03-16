const { axiosInstance } = require(".");
export const saveDailyGoals = async (goals, token) => {
    try {
      const response = await fetch("http://localhost:8082/api/daily-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(goals),
      });
      return await response.json();
    } catch (error) {
      return { error: "Server error. Please try again." };
    }
  };
  
 
  export const fetchDailyGoals = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:8082/api/daily-goals/today?userId=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return await response.json();
    } catch (error) {
      return { error: "Server error. Please try again." };
    }
  };
  
  export const deleteDailyGoal = async (userId, token) => {
    try {
      const response = await fetch(`http://localhost:8082/api/daily-goals/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return await response.json();
    } catch (error) {
      return { error: "Server error. Please try again." };
    }
  };

