import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animation

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/user/signup", formData);
      if (response.data) {
        alert("Signup Successful!");
        navigate("/login");
      } else {
        alert("Signup Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-indigo-600 to-purple-600">
      {/* Left Column - Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-white rounded-lg shadow-sm focus:outline-none "
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4  py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500">
                Login
              </Link>
            </p>
          </div>
        </motion.form>
      </div>

      {/* Right Column - Background Section */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
        <motion.div
          className="w-full h-full flex justify-center items-center bg-black bg-opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-white">Welcome Aboard!</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
