import { useEffect, useState } from "react";

const GoalsProgress = () => {
    const [goals, setGoals] = useState(null);

    useEffect(() => {
        fetch("/api/daily-goals/today", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => res.json())
        .then((data) => setGoals(data[0]))
        .catch((err) => console.error("Error fetching goals:", err));
    }, []);

    if (!goals) return <p> No goals for today</p>;

    const goalData = [
        { name: "Steps", value: goals.steps, goal: 10000, icon: "👟" },
        { name: "Calories", value: goals.calories, goal: 2000, icon: "🔥" },
        { name: "Water", value: goals.water, goal: 8, icon: "💧" },
        { name: "Workout Duration", value: goals.workoutDuration, goal: 60, icon: "🏋️" }
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
                                style={{ width: `${progress}%` }}
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
