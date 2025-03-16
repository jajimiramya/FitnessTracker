import React, { useEffect } from "react";
import { Form, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import bgImage from "../../assets/bg.jpg";

const Register = () => {
  const [form] = Form.useForm(); // Form instance
  const navigate = useNavigate();

  console.log("🟢 Register component loaded");

  const onFinish = async (values) => {
    // Convert age, height, and weight to numbers
    const formattedValues = {
      ...values,
      age: Number(values.age),
      height: Number(values.height),
      weight: Number(values.weight),
    };

    console.log("📢 Register button clicked, values:", formattedValues);

    try {
      const response = await RegisterUser(formattedValues);
      console.log("📩 Register API response:", response);

      if (response.success) {
        message.success(response.message);
        alert("🎉 Registration Successful! You will be redirected to login.");
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message || "Something went wrong");
    }
  };

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
      <div className="p-5 w-[400px] bg-black bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white mb-4 text-center">
          Welcome to Fitness Tracker! Please Register
        </h1>
        <hr className="border-gray-600" />
        <Form form={form} layout="vertical" className="mt-3" onFinish={onFinish}>
          {/* Name */}
          <Form.Item
            label={<span className="text-gray-300">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input   placeholder="Enter your name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={<span className="text-gray-300">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input 
           
            type="email" placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
           label={<span className="text-gray-300">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input   type="password" placeholder="Enter your password" />
          </Form.Item>

          {/* Age */}
          <Form.Item
            label={<span className="text-gray-300">Age</span>}
            name="age"
            rules={[
              { required: true, message: "Please enter your age!" },
              { type: "number", min: 10, max: 100, message: "Age must be between 10 and 100!" },
            ]}
          >
            <Input 
              type="number"
              placeholder="Enter your age"
              onChange={(e) => form.setFieldsValue({ age: Number(e.target.value) })}
            />
          </Form.Item>

          {/* Height */}
          <Form.Item
           label={<span className="text-gray-300">Height(cm)</span>}
            name="height"
            rules={[
              { required: true, message: "Please enter your height!" },
              { type: "number", min: 50, max: 250, message: "Height must be between 50 and 250 cm!" },
            ]}
          >
            <Input 
              type="number"
              placeholder="Enter your height (cm)"
              onChange={(e) => form.setFieldsValue({ height: Number(e.target.value) })}
            />
          </Form.Item>

          {/* Weight */}
          <Form.Item
            label={<span className="text-gray-300">Weight(kg)</span>}
            name="weight"
            rules={[
              { required: true, message: "Please enter your weight!" },
              { type: "number", min: 20, max: 300, message: "Weight must be between 20 and 300 kg!" },
            ]}
          >
            <Input
              type="number" 
              placeholder="Enter your weight (kg)"
              onChange={(e) => form.setFieldsValue({ weight: Number(e.target.value) })}
            />
          </Form.Item>

          {/* Submit Button */}
          <div className="flex flex-col mt-3 gap-3">
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg">
              REGISTER
            </button>
            <Link to="/login" className="text-gray-300 text-center">
              Already have an account? <span className="text-blue-400">Login</span>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
