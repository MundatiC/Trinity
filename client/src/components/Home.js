// Home.js
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

export const Home = () => {
  const [activeComponent, setActiveComponent] = useState('feed');
  const [activePost, setActivePost] = useState(null);

  const renderComponent = (componentName) => {
    setActiveComponent(componentName);
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
        {isSearchSelected ? (
          <Search />
        ) : activeComponent === 'feed' ? (
          <Feed onPostClick={handlePostClick} />
        ) : activeComponent === 'notifications' ? (
          <Notifications />
        ) : activeComponent === 'profile' ? (
          <Profile onPostClick={handlePostClick} />
        ) : activeComponent === 'settings' ? (
          <Settings />
        ) : activeComponent === 'postDetails' ? (
          <PostDetails post={activePost} />
        ) : activeComponent === 'follow' ? (
          <Follow />
        ) : null}
      </div>
      <div className="third-section">
        {isSearchSelected ? <Footer /> : <Search />}
      </div>
    </div>
  );
};

export default Home;
