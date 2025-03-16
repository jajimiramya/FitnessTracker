import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const HistoricalGoals = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("/api/daily-goals/history/7", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res) => res.json())
        .then((data) => setHistory(data.data))
        .catch((err) => console.error("Error fetching history:", err));
    }, []);

    if (!history.length) return <p>Loading historical data...</p>;

    // Prepare data for chart
    const labels = history.map((goal) => new Date(goal.date).toLocaleDateString());
    const stepsData = history.map((goal) => goal.steps);
    const caloriesData = history.map((goal) => goal.calories);
    const waterData = history.map((goal) => goal.water);
    const workoutData = history.map((goal) => goal.workoutDuration);

    const data = {
        labels,
        datasets: [
            { 
                label: "Steps", 
                data: stepsData, 
                backgroundColor: "rgba(0, 0, 255, 0.6)", 
            },
            { 
                label: "Calories", 
                data: caloriesData, 
                backgroundColor: "rgba(255, 0, 0, 0.6)", 
            },
            { 
                label: "Water (L)", 
                data: waterData, 
                backgroundColor: "rgba(0, 128, 128, 0.6)", 
            },
            { 
                label: "Workout Duration (min)", 
                data: workoutData, 
                backgroundColor: "rgba(0, 255, 0, 0.6)", 
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Historical Progress (Last 7 Days)</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HistoricalGoals;
