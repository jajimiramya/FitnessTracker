import { useState, useEffect } from "react";
import { addMeal, getMeals } from "../../apicalls/nutritionApi";

const NutritionTracker = () => {
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({ mealName: "", calories: "", carbs: "", proteins: "", fats: "" });

  // ✅ Fetch meals on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from local storage
      if (!token) {
        alert("Authentication required! Please log in.");
        return;
      }
      try {
        const fetchedMeals = await getMeals(token);

        // ✅ Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // ✅ Filter meals logged today
        const todayMeals = fetchedMeals.filter(meal => meal.timestamp.startsWith(today));

        setMeals(todayMeals); // ✅ Update state with today's meals only
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };
    fetchMeals();
  }, []);

  // ✅ Calculate total calorie intake for today
  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (add meal)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication required! Please log in.");
      return;
    }

    try {
      const response = await addMeal(meal, token);
      if (response) {
        setMeals([...meals, response]); // ✅ Update UI with new meal
        setMeal({ mealName: "", calories: "", carbs: "", proteins: "", fats: "" });
      }
    } catch (error) {
      console.error("Failed to add meal:", error);
      alert("Error adding meal!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Log Your Meals</h2>

      {/* Calorie Summary */}
      <div className="bg-blue-100 p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-medium">Total Calories Today</h3>
        <p className="text-2xl font-bold text-blue-600">{totalCalories} kcal</p>
      </div>

      {/* Meal Input Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4 grid grid-cols-2 gap-4">
        <input type="text" name="mealName" value={meal.mealName} onChange={handleChange} placeholder="Meal Name" className="border p-2 rounded" required />
        <input type="number" name="calories" value={meal.calories} onChange={handleChange} placeholder="Calories" className="border p-2 rounded" required />
        <input type="number" name="carbs" value={meal.carbs} onChange={handleChange} placeholder="Carbs (g)" className="border p-2 rounded" />
        <input type="number" name="proteins" value={meal.proteins} onChange={handleChange} placeholder="Protein (g)" className="border p-2 rounded" />
        <input type="number" name="fats" value={meal.fats} onChange={handleChange} placeholder="Fats (g)" className="border p-2 rounded" />
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">Add Meal</button>
      </form>

      {/* Meal Cards */}
      <h3 className="text-xl font-semibold mb-2">Today's Meals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.length === 0 ? (
          <p className="text-gray-500">No meals logged today.</p>
        ) : (
          meals.map((m, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
              <h4 className="text-lg font-medium">{m.mealName}</h4>
              <p className="text-gray-700">Calories: <span className="font-semibold">{m.calories} kcal</span></p>
              <p className="text-gray-700">Carbs: <span className="font-semibold">{m.carbs}g</span> | Protein: <span className="font-semibold">{m.proteins}g</span> | Fats: <span className="font-semibold">{m.fats}g</span></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NutritionTracker;
