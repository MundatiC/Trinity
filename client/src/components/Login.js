import React, {useState} from 'react'
import logo from './images/logo1.png'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Login = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      Username,
      Password,
    };
    console.log(loginData);
    // Store the token in localStorage

    try {
      const response = await axios.post(
        "http://localhost:5050/login",
        loginData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Handle successful login response here

      navigate("/feed");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <>
    <div className='login-box'>
    <img src={logo} alt='not' className='logo'/>
    <h2>Sign in to Trinity</h2>

    <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' required  value={Username}
          onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' placeholder='password' required
         value={Password}
         onChange={(e) => setPassword(e.target.value)}/>
        <button>Login</button>
    </form>

    <p>Don't have an account? <Link to="/signup"><span>Signup</span></Link></p>
    </div>
    </>
    
  )
}

export default Login
