import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', calories: 450, steps: 7000, workoutTime: 30 },
  { date: 'Tue', calories: 500, steps: 8500, workoutTime: 40 },
  { date: 'Wed', calories: 400, steps: 6000, workoutTime: 25 },
  { date: 'Thu', calories: 550, steps: 9000, workoutTime: 45 },
  { date: 'Fri', calories: 480, steps: 7500, workoutTime: 35 },
  { date: 'Sat', calories: 620, steps: 10000, workoutTime: 50 },
  { date: 'Sun', calories: 390, steps: 6800, workoutTime: 20 },
];


const ProgressChart = () => {
  return (
    <div>
         <h2 className="text-3xl font-bold mb-4">📈Progress chart</h2>
         <div className="bg-white p-4 rounded-xl shadow-lg">
    
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="calories" stroke="#FF6B6B" name="Calories Burned" />
        <Line type="monotone" dataKey="steps" stroke="#4ECDC4" name="Steps Taken" />
        <Line type="monotone" dataKey="workoutTime" stroke="#5567D9" name="Workout Time (min)" />
      </LineChart>
    </ResponsiveContainer>
  </div>

 </div>
  )
}

export default ProgressChart