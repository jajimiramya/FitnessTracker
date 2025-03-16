import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Pages/Home/Navbar";
import ProtectedRoute from "./Components/protectedRoute";
import { useSelector } from "react-redux";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import Dashboard from './Pages/Home/Dashboard';
import WorkoutsPage from "./Pages/Workouts/WorkoutsPage";
import Nutrition from "./Pages/Nutrition/Nutrition";
import Goals from "./Pages/Goals/Goals";
import "./index.css";
//import Motivation from "./Pages/Motivation/Motivation";

console.log("🔹App.js loaded...")

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />


          <Route path="/" element={<h1>Home Route Working!</h1>} />
          <Route path="/test" element={<h1>Test Route Works!</h1>} />


          <Route
            path="/workouts"
            element={
              <ProtectedRoute>
                <WorkoutsPage />
              </ProtectedRoute>
            }
          />

<Route
            path="/goals"
            element={
              <ProtectedRoute>
                <Goals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nutrition"
            element={
              <ProtectedRoute>
                <Nutrition />
              </ProtectedRoute>
            }
          />




          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
