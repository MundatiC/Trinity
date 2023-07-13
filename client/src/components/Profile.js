import React, { useState, useEffect } from 'react';
import './Profile.css';
import FlipMove from 'react-flip-move';
import Post from './Post';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    fetchProfileData();
    fetchLikedPosts();
    fetchMyPosts();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get('http://localhost:5052/showProfile', {
        withCredentials: true,
      });
      console.log(response)
      setProfileData(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5052/getLikedPosts', {
        withCredentials: true,
      });
      console.log(response)
      setLikedPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5051/myposts', {
        withCredentials: true,
      });
      console.log(response)
      setMyPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching my posts:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredPosts = activeTab === 'posts' ? myPosts : likedPosts;

  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileData.ProfilePicture ? (
              <img src={profileData.ProfilePicture} alt="Avatar" />
            ) : (
              <i className="fa fa-user fa-5x" aria-hidden="true"></i>
            )}
          </div>
          <div className="profile-info">
            <h2>{profileData.Username}</h2>
            <p className="name">{profileData.Name}</p>
          </div>
        </div>
        <div className="profile-bio">
          <p>{profileData.Bio}</p>
        </div>
        <div className="profile-stats">
          <div className="followers">
            <span className="count">{profileData.FollowersCount}</span>
            <span className="label">Followers</span>
          </div>
          <div className="following">
            <span className="count">{profileData.FollowingCount}</span>
            <span className="label">Following</span>
          </div>
        </div>
        <div className="profile-tabs">
          <div
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => handleTabChange('posts')}
          >
            POSTS
          </div>
          <div
            className={`tab ${activeTab === 'likes' ? 'active' : ''}`}
            onClick={() => handleTabChange('likes')}
          >
            LIKES
          </div>
        </div>
        <FlipMove>
          {filteredPosts.map((post) => (
            <Post key={post.PostId} post={post} />
          ))}
        </FlipMove>
      </div>
    </>
  );
};

export default Profile;
