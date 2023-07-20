import React, { useState } from 'react';
import logo from './images/logo1.png';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';



export const Signup = () => {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [c_password, setc_password] = useState('');
  const [ProfilePicture, setProfilePicture] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [signupStatus, setSignupStatus] = useState('');

  const navigate = useNavigate();


  const uploadImage = async (files) => {
    const selectedFile = files[0];

  // Check if the selected file is an image
  if (!selectedFile || !selectedFile.type.startsWith('image/')) {
    // Show an error message (optional)
    handleError('Please select an image file (png, jpeg, jpg).');
    return; // Stop further processing
  }
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "faozlxxi");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/trinity-social/image/upload",
        formData
      );
          if(response.status === 200){
            setProfilePicture(response.data.secure_url);
          } else{
            handleError('Image upload failed. Please try again later.');
          }
          
        
    } catch (error) {
      handleError('Image upload failed. Please try again later.');
    }
   
  };

 
  const handleSuccess = () => {
    toast.success('Signup successful!', {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleError = (errorMessage) => {
    toast.error(errorMessage, {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
 

    const registrationData = {
      Username,
      Email,
      Password,
      c_password,
      ...(ProfilePicture && { ProfilePicture })
    };
    
    try {
      const response = await axios.post('http://localhost:5050/register', registrationData);
      setSignupStatus('success');
      console.log(response);
      if(response.status === 201){
        handleSuccess();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
     // Show success toast
      
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        const errorMessage = error.response.data.message;
        if(errorMessage){
          if (errorMessage?.includes('pattern')) {
            handleError('Invalid password. Please choose a stronger password.');
          } else if (errorMessage?.includes('"Email" must be a valid email') ) {
            handleError('Invalid email format. Please enter a valid email.');
          }
          else if (errorMessage?.includes('c_password') ) {
            handleError('Password and confirm password do not match');
          }
          else if (errorMessage?.includes('UC_Email') ) {
            handleError('Email is already in use. Please enter a different email.');
          }
          else if (errorMessage?.includes('UC_Username') ) {
            handleError('Username is already in use. Please enter a different Username.');
          } else {
            handleError('Signup failed. Please try again later.');
          }
         
          setSignupStatus('error');
        } else if (error.request) {
          console.error('No response from server:', error.request);
          handleError('No response from server. Please try again later.');
          setSignupStatus('error');
        } else {
          console.error('Error:', error.message);
          handleError('An error occurred. Please try again later.');
          setSignupStatus('error');
        }
        }
      
    }  finally {
      setIsLoading(false); // Set isLoading back to false after the signup process is complete
    }
  };

  return (
    <>
    <ToastContainer />
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
            onChange={(e) =>  uploadImage(e.target.files)}
          />

         
          <button type="submit" disabled={isLoading}>
            {isLoading ? <span>Loading...</span> : 'Signup'}
          </button>
          {isLoading && <i className='fa loading-spinner'></i>}
        </form>

        <p>
          Already have an account? <Link to="/"><span>Login</span></Link>
        </p>

        
      </div>
    </>
  );
};

export default Signup;
