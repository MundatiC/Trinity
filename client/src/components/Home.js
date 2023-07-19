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
import { Outlet } from 'react-router-dom';

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

 

  const isSearchSelected = activeComponent === 'search';

  return (
    <div className="awesome">
      <div className="sidebar">
        <Sidebar onComponentClick={renderComponent} />
      </div>
      <div className="main-section">
       <Outlet/>
      </div>
      <div className="third-section">
        {isSearchSelected ? <Footer /> : <Search onSearchResultClick={handleSearchResultClick} />}
      </div>
    </div>
  );
};

export default Home;
