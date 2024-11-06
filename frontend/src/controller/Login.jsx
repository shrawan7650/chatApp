import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation

const Login = () => {
  const { setIsLogged, isLogged } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/user/login", formData);
      if (response.data) {
        alert("Login Successful!");
        localStorage.setItem("token", JSON.stringify(response.data));
        Cookies.set("jwt", response.data.token, { expires: 1 / 24 });
        navigate("/");
        setIsLogged(true);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error(error);
      setIsLogged(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-blue-500 to-teal-500">
      {/* Left Column - Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.form>
      </div>

      {/* Right Column - Background Section */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        {/* You can use a background image or a solid color/gradient */}
        <motion.div
          className="w-full h-full flex justify-center items-center bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
