import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button, Tab, Tabs } from '@material-ui/core';
import './followers.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Followers() {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [activeTab, setActiveTab] = useState('followers');

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, []);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get('http://localhost:5051/followers', {
        withCredentials: true,
      });
      setFollowers(response.data.data);
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get('http://localhost:5051/following', {
        withCredentials: true,
      });
      setFollowing(response.data.data);
    } catch (error) {
      console.error('Error fetching following:', error);
    }
  };

  const handleClick = (user) => {
    navigate(`/home/profiles/${user.UserId}`);
  };

  const handleFollow = async (userId) => {
    const data = {
      FollowerUserId: userId,
    };
    const response = await axios.post('http://localhost:5051/follow', data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      toast.success('Followed successfully');
      fetchFollowers();
      fetchFollowing();
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUnfollow = async (userId) => {
    const data = {
      FollowerUserId: userId,
    };
    const response = await axios.post('http://localhost:5051/unfollow', data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      toast.success('Unfollowed successfully');
      fetchFollowers();
      fetchFollowing();
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="profile-tabs">
            <div
              className={`tab ${activeTab === 'followers' ? 'active' : ''}`}
              onClick={() =>  handleTabChange('followers')}
            >
              Followers
            </div>
            <div
              className={`tab ${activeTab === 'following' ? 'active' : ''}`}
              onClick={() => handleTabChange('following')}
            >
              Following
            </div>
          </div>

      {activeTab === 'followers' && (
        <div>
          {followers.map((follower) => (
            <div key={follower.UserId} className="user-card">
              <div className="user-details" onClick={() => handleClick(follower)}>
                <Avatar src={follower.ProfilePicture} alt="" />
                <div className="user-card__info">
                  <h2>{follower.Username}</h2>
                </div>
              </div>
              {follower.isFollowing ? (
                <Button
                  variant="contained"
                  onClick={() => handleUnfollow(follower.UserId)}
                  className="follow-button"
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleFollow(follower.UserId)}
                  className="follow-button"
                >
                  Follow
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'following' && (
        <div>
          {following.map((followedUser) => (
            <div key={followedUser.UserId} className="user-card">
              <div className="user-details" onClick={() => handleClick(followedUser)}>
                <Avatar src={followedUser.ProfilePicture} alt="" />
                <div className="user-card__info">
                  <h2>{followedUser.Username}</h2>
                </div>
              </div>
              <Button
                variant="contained"
                onClick={() => handleUnfollow(followedUser.UserId)}
                className="follow-button"
              >
                Unfollow
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;