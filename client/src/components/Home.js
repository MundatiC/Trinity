import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Feed from './Feed';
import './Home.css';
import Search from './Search';
import Notifications from './Notifications';
import Profile from './Profile';
import Settings from './Settings';
import Post from './Post';
import Footer from './Footer';

export const Home = () => {
  const [activeComponent, setActiveComponent] = useState('feed');
  const [activePost, setActivePost] = useState(null);

  const renderComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  const handlePostClick = (post) => {
    setActivePost(post);
    setActiveComponent('post');
  };

  const isSearchSelected = activeComponent === 'search';

  return (
    <div className="awesome">
      
      <Sidebar onComponentClick={renderComponent} />
    
     
      <div className="main-section">
        {isSearchSelected ? (
          <Search />
        ) : (
          <>
            {activeComponent === 'feed' && <Feed onPostClick={handlePostClick} />}
            {activeComponent === 'notifications' && <Notifications />}
            {activeComponent === 'profile' && <Profile />}
            {activeComponent === 'settings' && <Settings />}
            {activeComponent === 'post' && (
              <Post post={activePost} showComments={true} onClose={() => setActiveComponent('feed')} />
            )}
          </>
        )}
      </div>
      <div className="third-section">
        {isSearchSelected ? <Footer /> : <Search />}
      </div>
    </div>
  );
};

export default Home;
