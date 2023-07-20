import React, { useState } from 'react';
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
import Sidebar2 from './Sidebar2';

export const Home = () => {
  const [activeComponent, setActiveComponent] = useState('feed');
  const [activePost, setActivePost] = useState(null);
  const [realUserId, setRealUserId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // Add state to control sidebar visibility

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
      {showSidebar && (
        <div className="sidebar">
          <Sidebar onComponentClick={renderComponent} />
        </div>
       
      )}
       
      <div className="main-section">
        <Outlet />
      </div>
      <div className="third-section">
        {isSearchSelected ? <Footer /> : <Search onSearchResultClick={handleSearchResultClick} />}
      </div>
      <div className='sidebar2'>
        <Sidebar2 onComponentClick={renderComponent}/>
      </div>
    </div>
  );
};

export default Home;
