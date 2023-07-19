import './App.css';
import Feed from './components/Feed';
import Follow from './components/Follow';
import  Home  from './components/Home'
import  Login  from './components/Login'
import Logout from './components/Logout';
import MainProfile from './components/MainProfile';
import Notifications from './components/Notifications';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';
import Search from './components/Search';
import Settings from './components/Settings';
import  Signup  from './components/Signup'

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
   
    <Route path="/home" element={ <Home/> }>
        <Route path="/home/profile/:UserId" element={<MainProfile />}/>
        <Route path='/home/feed' element={<Feed/>}/>
        <Route path='/home/search' element={<Search/>}/>
        <Route path='/home/notifications' element={<Notifications/>}/>
        <Route path='/home/settings' element={<Settings/>}/>
        <Route path='/home/follow' element ={<Follow/>}/>
        <Route path='/home/logout' element={<Logout/>}/>
        <Route path='/home/:id' element={<Profile/>}/>
        <Route path='/home/post/:PostId' element={<PostDetails/>}/>
      </Route>
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Login />} />
    </Route>
   
  )
);

const App = () => {
  return <RouterProvider router={myRouter} />;
};

export default App;
