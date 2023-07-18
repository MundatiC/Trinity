import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import './Home.css';
import Search from './Search';
import Notifications from './Notifications';
import Profile from './Profile';
import Settings from './Settings';
import PostDetails from './PostDetails';
import Footer from './Footer';
import Follow from './Follow';
import Logout from './Logout';
import axios from 'axios';
import MainProfile from './MainProfile';

export const Home = () => {
  const [activeComponent, setActiveComponent] = useState('feed');
  const [activePost, setActivePost] = useState(null);
  const [realUserId, setRealUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const renderComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleSearchResultClick = (userId) => {
    setSelectedUserId(userId);
    setActiveComponent('profile');
  };

  const handlePostClick = (post) => {
    setActivePost(post);
    setActiveComponent('postDetails');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5052/getUser', {
          withCredentials: true,
        });
        const { UserId } = response.data.data[0];
        console.log(UserId);
        setRealUserId(UserId);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const isSearchSelected = activeComponent === 'search';

  return (
    <div className="awesome">
      <div className="sidebar">
        <Sidebar onComponentClick={renderComponent} />
      </div>
      <div className="main-section">
        {isSearchSelected ? (
          <Search onSearchResultClick={handleSearchResultClick} />
        ) : activeComponent === 'feed' ? (
          <Feed onPostClick={handlePostClick} />
        ) : activeComponent === 'notifications' ? (
          <Notifications />
        ) : activeComponent === 'profile' && selectedUserId ? (
          <Profile
            key={selectedUserId}
            onPostClick={handlePostClick}
            UserId={selectedUserId}
          />
        ) : activeComponent === 'mainprofile' ? (
          <MainProfile onPostClick={handlePostClick} UserId={realUserId} />
        ) : activeComponent === 'settings' ? (
          <Settings />
        ) : activeComponent === 'postDetails' ? (
          <PostDetails post={activePost} />
        ) : activeComponent === 'follow' ? (
          <Follow onSearchResultClick={handleSearchResultClick} />
        ) : activeComponent === 'logout' ? (
          <Logout />
        ) : null}
      </div>
      <div className="third-section">
        {isSearchSelected ? <Footer /> : <Search onSearchResultClick={handleSearchResultClick} />}
      </div>
    </div>
  );
};

export default Home;
