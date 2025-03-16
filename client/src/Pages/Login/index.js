import React , {useEffect} from 'react'
import {Form, message} from "antd";
import Button from "../../Components/Button";
import { Link , useNavigate } from "react-router-dom";
import { LoginUser } from '../../apicalls/users';
import bgImage from '../../assets/bg.jpg';



const Login = () => {
   const navigate = useNavigate()

  const onFinish = async(values) =>{
     try {
      const response = await LoginUser(values)

      if(response.success){
        message.success(response.message)
        localStorage.setItem('token' , response.data)
        window.location.href = "/dashboard";
       }
      else{
        message.error(response.message)
      }
     } catch (error) {
      message.error(error.message)
     }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div className="card p-5 w-[400px] bg-black bg-opacity-50 rounded-lg shadow-lg">
    <h1 className="text-2xl text-white mb-3 text-center">Welcome Again! Please Login</h1>
    <hr className="border-gray-600" />
    <Form layout="vertical" className="mt-3" onFinish={onFinish}>
      <Form.Item
        label={<span className="text-gray-300">Email</span>}
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 bg-gray-800 border border-gray-500 text-white rounded-lg"
        />
      </Form.Item>
      <Form.Item
        label={<span className="text-gray-300">Password</span>}
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 bg-gray-800 border border-gray-500 text-white rounded-lg"
        />
      </Form.Item>

      <div className="flex flex-col mt-3 gap-3">
        <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
          LOGIN
        </button>
        <Link to="/register" className="text-gray-300 text-center">
          Don't have an account? <span className="text-blue-400">Register</span>
        </Link>
      </div>
    </Form>
  </div>
</div>

  )
}

export default Login