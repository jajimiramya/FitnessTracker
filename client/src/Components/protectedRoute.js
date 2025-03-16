import { message } from "antd";
import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { Link } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };
 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpresentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user &&
    (
      <div className="layout p-0">


        <nav className="bg-green-500 h-16 flex items-center justify-between px-6 shadow-lg">
          <h1 className="text-white text-2xl font-bold">🏋️‍♀️ Fitness Tracker</h1>
          <ul className="flex">
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/" className="text-white">🏠 Dashboard</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/workouts" className="text-white">💪 Workouts</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/goals" className="text-white">🎯 Goals</Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/nutrition" className="text-white">🥗 Nutrition</Link>
            </li>
            
            
           
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/profile" className="text-white"> 👤 Profile</Link>
            </li>
          </ul>



          {/* Profile and Logout */}

          <div className="flex items-center text-black space-x-2">
            <i className="ri-shield-user-line"></i>
            <h1
              className="text-sm underline cursor-pointer"
              onClick={() => navigate(user.isAdmin ? "/admin" : "/profile")}
            >
              {user.name}
            </h1>
            <i
              className="ri-logout-box-r-line cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>

        </nav>

        <div className="content mt-1 p-1">{children}</div>
      </div>


    )
  );
}

export default ProtectedRoute;