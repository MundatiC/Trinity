import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import './Logout.css'

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5050/logout", {
        withCredentials: true,
      });
  
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate("/");
      }, 1500); // Delay the navigation for 1.5 seconds
  
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Error logging out:", error);
    }
  };
  
  const handleCancel = () => {
    navigate("/home/");
  };
  return (
    <>
     
      <div className="Home-component">
     
        <div className="logout-component">
        <ToastContainer />
          <h1>Logout of Trinity</h1>
          <p>
            Are you sure you want to log out of your account? <br />
            You will be able to log back in whenever you want.
          </p>
          <div className="buttons">
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Logout;
