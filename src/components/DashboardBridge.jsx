import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { Button } from "./ui/button";

const DashboardBridge = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiRunning, setIsApiRunning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the API is running
  const checkApiStatus = async () => {
    try {
      await axios.get(`${config.apiBaseUrl}/health-check`, { timeout: 5000 });
      setIsApiRunning(true);
      return true;
    } catch (err) {
      console.error("API connection failed:", err);
      setIsApiRunning(false);
      return false;
    }
  };
  
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Wait a moment to ensure all components are mounted
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if backend is available
        const apiRunning = await checkApiStatus();
        if (!apiRunning) {
          setError("Cannot connect to the backend API. Please make sure the server is running.");
          setIsLoading(false);
          return;
        }
        
        // Instead of redirecting, let it display the bridge UI
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setError(err.message || "Failed to load dashboard components");
        setIsLoading(false);
      }
    };
    
    loadDashboard();
  }, []);
  
  // Handle navigation back to portfolio
  const handleBackToPortfolio = () => {
    navigate("/");
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Dashboard Error</h2>
        <p className="mb-6">{error}</p>
        <p className="mb-4">
          {!isApiRunning ? (
            <>
              The backend server appears to be offline. Please make sure that:
              <ul className="list-disc text-left mt-2 mb-6 mx-auto max-w-md">
                <li className="ml-6 mb-2">The backend server is running on port 4000</li>
                <li className="ml-6 mb-2">There are no network connectivity issues</li>
                <li className="ml-6 mb-2">The API URL in your configuration is correct</li>
              </ul>
            </>
          ) : (
            "Please check the console for more details or try again later."
          )}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => window.location.reload()}
            className="mr-2"
          >
            Retry Connection
          </Button>
          <Button 
            onClick={handleBackToPortfolio}
            variant="outline"
          >
            Return to Portfolio
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg mb-4">Welcome to the dashboard section.</p>
      <p className="mb-8">
        You are viewing: {location.pathname.replace("/dashboard", "") || "Dashboard Home"}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
        <DashboardLink path="/dashboard" label="Dashboard Home" />
        <DashboardLink path="/dashboard/manage/skills" label="Skills" />
        <DashboardLink path="/dashboard/manage/timeline" label="Timeline" />
        <DashboardLink path="/dashboard/manage/projects" label="Projects" />
        <DashboardLink path="/dashboard/login" label="Login" />
        <DashboardLink path="/" label="Back to Portfolio" />
      </div>
    </div>
  );
};

// Helper component for dashboard navigation
const DashboardLink = ({ path, label }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <button
      onClick={() => navigate(path)}
      className={`p-4 rounded-lg ${
        isActive 
          ? "bg-blue-600 text-white" 
          : "bg-gray-700 hover:bg-gray-600 text-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default DashboardBridge; 