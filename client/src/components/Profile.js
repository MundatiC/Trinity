import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Avatar } from '@material-ui/core';
import FlipMove from 'react-flip-move';
import Post from './Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = ({ onPostClick }) => {
  const { UserId } = useParams();
  const [profileData, setProfileData] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(`http://localhost:5052/showProfile/${UserId}`, {
          withCredentials: true,
        });
        setProfileData(profileResponse.data.data[0]);

        const likedPostsResponse = await axios.get(`http://localhost:5052/getLikedPosts/${UserId}`, {
          withCredentials: true,
        });
        setLikedPosts(likedPostsResponse.data.data);

        const myPostsResponse = await axios.get(`http://localhost:5051/myposts/${UserId}`, {
          withCredentials: true,
        });
        setMyPosts(myPostsResponse.data.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [UserId]);

  const handlePostClick = (post) => {
    console.log('working');
    onPostClick(post);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredPosts = activeTab === 'posts' ? myPosts : likedPosts;

  return (
    <>
      <div className="profile">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <Avatar src={profileData.ProfilePicture} alt={profileData.Name}
               style={{ width: '100px', height: '100px' }}  />
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
              <span className="count">{profileData.FollowingCount}</span>
              <span className="label">Followers</span>
            </div>
            <div className="following">
              <span className="count">{profileData.FollowersCount}</span>
              <span className="label">Following</span>
            </div>
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
            <Post key={post.PostId} post={post} onClick={() => handlePostClick(post)} />
          ))}
        </FlipMove>
      </div>
    </>
  );
};

export default Profile;
