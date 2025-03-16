const { axiosInstance } = require(".");
export const addMeal = async (mealData, token) => {
    try {
      const response = await fetch("http://localhost:8082/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mealData),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error adding meal:", error);
      return { error: "Failed to add meal" };
    }
  };
  
  export const getMeals = async (token) => {
    try {
      const response = await fetch("http://localhost:8082/api/meals", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching meals:", error);
      return { error: "Failed to fetch meals" };
    }
  };
  
  export const deleteMeal = async (mealId, token) => {
    try {
      const response = await fetch(`http://localhost:8082/api/meals/${mealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting meal:", error);
      return { error: "Failed to delete meal" };
    }
  };
  