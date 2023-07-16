import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function Settings() {
  const [Username, setUsername] = useState('');
  const [Bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    try {
      // Update username
      await axios.put('/user/username', { Username });

      // Update bio
      await axios.put('/user/bio', { Bio });

      // Update profile picture
      if (profilePicture) {
        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        await axios.put('/user/profilePicture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Update password
      if (newPassword && newPassword === confirmPassword) {
        await axios.put('/user/password', {
          currentPassword,
          newPassword,
        });
      }

      setSuccessMessage('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating user settings:', error);
      setErrorMessage('Failed to update settings. Please try again.');
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            accept=".jpg, .jpeg, .png"
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
        </div>
        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
}

export default Settings;
