const { axiosInstance } = require(".");
export const fetchDailySummary = async (userId) => {
    try {
      const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
      const response = await axiosInstance.get(`http://localhost:8082/api/daily-summary/${userId}`);
      console.log("API Response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Error fetching daily summary:", error.response?.data || error.message);
      throw error;
    }
  };
  