import React, { useState } from 'react';
import logo from './images/logo1.png';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Signup = () => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [c_password, setc_password] = useState('');
  const [ProfilePicture, setProfilePicture] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupStatus, setSignupStatus] = useState('');

  const navigate = useNavigate();


  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "faozlxxi");
    fetch("https://api.cloudinary.com/v1_1/trinity-social/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePicture(data.secure_url);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Password !== c_password) {
      setPasswordError('Password and confirm password do not match');
      return;
    }
    const registrationData = {
      Username,
      Email,
      Password,
      c_password,
      ProfilePicture: ProfilePicture,
    };
    console.log(registrationData);
    try {
      const response = await axios.post('http://localhost:5050/register', registrationData);
      setSignupStatus('success');
      console.log(response);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        // Check if error is related to password
        if (error.response.data.message === 'Invalid password') {
          setPasswordError('Invalid password. Please choose a stronger password.');
        } else {
          setPasswordError('Signup failed. Please try again later.');
        }
        setSignupStatus('error');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setPasswordError('No response from server. Please try again later.');
        setSignupStatus('error');
      } else {
        console.error('Error:', error.message);
        setPasswordError('An error occurred. Please try again later.');
        setSignupStatus('error');
      }
    }
  };

  return (
    <>
      <div className="login-box">
        <img src={logo} alt="not" className="logo" />
        <h2>Signup to Trinity</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            required
            value={c_password}
            onChange={(e) => setc_password(e.target.value)}
          />

          <input
            type="file"
            id="myFile"
            name="filename"
            
            accept="image/png, image/jpeg,image/jpg"
            onChange={(e) => uploadImage(e.target.files)}
          />

          {passwordError && <p className="error">{passwordError}</p>}
          <button>Signup</button>
        </form>

        <p>
          Already have an account? <Link to="/"><span>Login</span></Link>
        </p>

        {signupStatus === 'success' && <p className="toast success">Signup successful!</p>}
        {signupStatus === 'error' && <p className="toast error">Signup failed. Please try again.</p>}
      </div>
    </>
  );
};

export default Signup;
