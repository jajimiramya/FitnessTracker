const { axiosInstance } = require(".");


export const saveDailyGoals = async (goals, token) => {
  try {
    const userId = localStorage.getItem("userId"); // 🔹 Retrieve stored userId

    if (!userId) {
      console.error("❌ User ID missing");
      return { error: "User not logged in" };
    }

    const { data } = await axiosInstance.post(
      "/api/daily-goals",
      { userId, ...goals }, // 🔹 Ensure userId is included
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Goals saved:", data);
    return data;
  } catch (error) {
    console.error("❌ Error saving goals:", error.response?.data || error.message);
    return { error: error.response?.data || "Failed to save goals" };
  }
};



export const fetchDailyGoals = async (token) => {
  try {
    const { data } = await axiosInstance.get("/daily-goals", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Fetched daily goals:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching daily goals:", error.response?.data || error.message);
    return { error: error.response?.data || "Failed to fetch daily goals" };
  }
};