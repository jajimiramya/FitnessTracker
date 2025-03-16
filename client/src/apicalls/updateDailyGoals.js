export const updateDailyGoals = async (userId, updatedData, token) => {
    try {
      const response = await fetch(`http://localhost:8082/api/daily-goals/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating daily goals:", error);
      return { error: "Failed to update daily goals" };
    }
  };
  