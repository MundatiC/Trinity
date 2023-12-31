import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';
import { toast, ToastContainer } from 'react-toastify';

function Settings() {
  const [Username, setUsername] = useState('');
  const [Bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5052/getUser', {
        withCredentials: true,
      });
      const { Username, Bio, profilePicture } = response.data.data[0];
      setUsername(Username);
      setBio(Bio);
      setProfilePicture(profilePicture);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true)

    try {
      // Update username
      const response = await axios.put('http://localhost:5052/editProfile',{
        Username
      }, {
        withCredentials: true,
      });

      // Update bio
      const response2 = await axios.put('http://localhost:5052/editProfile',{
        Bio
      }, {
        withCredentials: true,
      });
      console.log(response2)

      if( response.status === 200 && response2.status === 200){
        toast.success('Updated details successfully')
      }

      // Update profile picture
      if (profilePicture) {
        const formData = new FormData();
        formData.append('file', profilePicture);
        formData.append('upload_preset', 'faozlxxi');
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/trinity-social/image/upload",
            formData
          );
            console.log(response)
          const ProfilePicture = response.data.secure_url;
          console.log(ProfilePicture)

          if(response.data.secure_url){
            const response3 = await axios.put('http://localhost:5052/editProfile',{
                ProfilePicture
              }, {
                withCredentials: true,
              });
                console.log(response3)
          } else{
            setErrorMessage('Failed to update settings. Please try again.');
            toast.error(errorMessage)
          }

          

         

      }

      

      // Update password
      if (newPassword && newPassword === confirmPassword) {
        const response = await axios.put('http://localhost:5052/changePassword', {
          currentPassword,
          newPassword,
        },{
            withCredentials: true
        });
        if(response.status === 200){
          setSuccessMessage('Settings updated successfully!');
          toast.success(successMessage)
        } else{
          setErrorMessage('Password do not match');
          toast.error(errorMessage)
        }
        
        
      }
      

      setConfirmPassword('');
      setCurrentPassword('');
      setProfilePicture(null);
      setNewPassword('');
     
    } catch (error) {
      console.error('Error updating user settings:', error);
      setErrorMessage('Failed to update settings. Please try again.');
      toast.error(errorMessage)
    } finally{
      setIsLoading(false)
    }
  };

  return (
    
    <div className="settings-container">
      <ToastContainer/>
      <h1 className="settings-title">Account Settings</h1>
     
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="username" className="label">Username:</label>
          <input
            type="text"
            id="username"
            className="input"
            value={Username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="bio" className="label">Bio:</label>
          <textarea
            id="bio"
            className="input textarea"
            value={Bio}
            onChange={handleBioChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="profilePicture" className="label">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            className="input"
            onChange={handleProfilePictureChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="currentPassword" className="label">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            className="input"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="newPassword" className="label">New Password:</label>
          <input
            type="password"
            id="newPassword"
            className="input"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="input"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
           {isLoading && <i className='fa loading-spinner'></i>}
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
