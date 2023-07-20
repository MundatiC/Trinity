import React, {useState} from 'react'
import logo from './images/logo1.png'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'


export const Login = () => {
  const navigate = useNavigate();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    const loginData = {
      Username,
      Password,
    };
    console.log(loginData);
    // Store the token in localStorage

    try {
      const response = await axios.post(
        "http://localhost:5050/login",
        loginData,
        {
          withCredentials: true,
        }
       
      );
      console.log(response)

      // Handle successful login response here

      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        toast.error(error.response.data.message)
      } else if (error.request) {
        toast.error('Something went wrong, try agin later')
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }   finally {
      setIsLoading(false); // Set isLoading back to false after the signup process is complete
    }
  };
  return (
    <>
    <ToastContainer />
    <div className='login-box'>
    <img src={logo} alt='not' className='logo'/>
    <h2>Sign in to Trinity</h2>

    <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' required  value={Username}
          onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' placeholder='password' required
         value={Password}
         onChange={(e) => setPassword(e.target.value)}/>
         <button type="submit" disabled={isLoading}>
            {isLoading ? <span>Loading...</span> : 'Login'}
          </button>
          {isLoading && <i className='fa loading-spinner'></i>}
    </form>

    <p>Don't have an account? <Link to="/signup"><span>Signup</span></Link></p>
    </div>
    </>
    
  )
}

export default Login
