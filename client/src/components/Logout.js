import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  ToastContainer } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const results = await axios.get("http://localhost:5050/logout", {
        withCredentials: true,
    });
    console.log(results);
    if (results.status === 200) {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };
  const handleCancel = async () => {
    navigate("/home");
  };
  return (
    <>
    <ToastContainer/>
    <div className="Home-component">
   
      <div className="logout-component">
        <h1>Logout of SocialVerse</h1>
        <p>
          Are you sure you want to log out of your account? <br />
          You will be able to log back in whenever you want.
        </p>
        <button onClick={handleLogout}>Log out</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
    </>
    
  );
};

export default Logout;