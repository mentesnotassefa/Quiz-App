import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the authentication context
const AuthContext = createContext();

// Define the API base URL. This should be configured in a .env file in a real app.
const API_BASE_URL = "http://localhost:5000/api";

// AuthProvider component to wrap the entire application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user data and token from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // Set the default Authorization header for all future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      const { token, user } = response.data;

      // Save token and user to state and localStorage
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/"); // Redirect to home page after successful login
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response.data);
      return { success: false, error: error.response.data.message };
    }
  };

  // Function to handle user registration
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, { email, password });
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate("/"); // Redirect to home page after successful registration
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      return { success: false, error: error.response.data.message };
    }
  };

  // Function to handle user logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/"); // Redirect to home page
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;