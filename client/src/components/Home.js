import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import './Home.css'
import Search from './Search'
import Notifications from './Notifications'
import Profile from './Profile'
import Settings from './Settings'



  export const Home = () => {
    const [activeComponent, setActiveComponent] = useState('feed');
  
    const renderComponent = (componentName) => {
      setActiveComponent(componentName);
    };
  
    return (
      <div className='awesome'>
        <Sidebar onComponentClick={renderComponent} />
        {activeComponent === 'feed' && <Feed />}
        {activeComponent === 'search' && <Search />}
        {activeComponent === 'notifications' && <Notifications />}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'settings' && <Settings />}
        
      </div>
    );
}


export default Home