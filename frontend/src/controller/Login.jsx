import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const{setIsLogged,isLogged} = useAuth();
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
      const response = await axios.post(
        "/api/user/login",
        formData
      );
      if (response.data) {
        alert("login Suucessfuly");
      } else {
        alert("login Failed");
      }
   
      localStorage.setItem("token", JSON.stringify(response.data));
      //set Cookies
      
      Cookies.set("jwt", response.data.token, { expires: 1/24 });
      navigate("/")
      setIsLogged(true);
    } catch (error) {
      console.log(error);
      setIsLogged(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
