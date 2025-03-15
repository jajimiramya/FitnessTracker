const express= require('express')
const cors = require('cors');
const app = express()
app.use(cors());
//app.use(express.json())
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
require('dotenv').config()
const dbConfig = require('./config/dbConfig')


app.use((req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);
    next();
});
const userRoute = require('./routes/userRoute')
app.use('/api/users' , userRoute)

const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);

const dailyGoalRoutes = require("./routes/dailyGoalRoutes");
console.log("Daily Goals Route Loaded"); // ✅ Check if this prints
app.use("/api/daily-goals", dailyGoalRoutes);


const motivationRoutes = require("./routes/motivationRoutes");
app.use("/api/motivation", motivationRoutes);

const dailySummaryRoutes = require("./routes/dailySummary");
app.use("/api/daily-summary", dailySummaryRoutes);



const mealRoutes = require("./routes/meals");
console.log("Meals Route Loaded"); // ✅ Check if this prints
app.use("/api/meals", mealRoutes);



app.listen(8082 , ()=>{
    console.log('Server is Running')
})