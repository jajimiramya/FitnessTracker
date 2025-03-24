import { useEffect, useState } from "react";
import { axiosInstance } from "../../apicalls";

const GoalsProgress = ({ userId }) => {
    const [goals, setGoals] = useState(null);

    useEffect(() => {
        // Retrieve userId from localStorage if not passed as a prop
        let activeUserId = userId || localStorage.getItem("userId");

        console.log("🔄 GoalsProgress Component Mounted!");
        console.log("🆔 Received userId as Prop:", userId);
        console.log("📦 User ID from Local Storage:", activeUserId);

        const fetchGoals = async () => {
            if (!activeUserId) {
                console.warn("⚠ No userId found. Skipping API call.");
                return;
            }

            try {
                console.log("🚀 Fetching goals for user:", activeUserId);
                const response = await axiosInstance.get(`http://localhost:8082/api/daily-goals/${activeUserId}`);
                console.log("✅ API Response:", response.data);

                if (response.data && response.data.goal) {
                    setGoals(response.data.goal);
                } else {
                    console.warn("⚠ No goals found for today.");
                }
            } catch (error) {
                console.error("❌ Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, [userId]); // Only runs when `userId` changes

    if (!goals) {
        return <p>⚠ No goals found for today.</p>; // More descriptive message
    }

    // Goal Data Configuration
    const goalData = [
        { name: "Steps", value: goals.steps || 0, goal: 10000, icon: "👟" },
        { name: "Calories", value: goals.calories || 0, goal: 2000, icon: "🔥" },
        { name: "Water", value: goals.water || 0, goal: 8, icon: "💧" },
        { name: "Workout Duration", value: goals.workoutDuration || 0, goal: 60, icon: "🏋️" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {goalData.map((goal) => {
                const progress = (goal.value / goal.goal) * 100;
                return (
                    <div key={goal.name} className="p-4 border rounded-lg shadow-md bg-white">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{goal.icon}</span>
                            <h3 className="text-lg font-semibold">{goal.name}</h3>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full ${
                                    progress >= 100 ? "bg-green-500" : "bg-blue-500"
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm">{goal.value} / {goal.goal}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default GoalsProgress;
