import './App.css';
import  Home  from './components/Home'
import  Login  from './components/Login'
import  Signup  from './components/Signup'
import UploadWidget from './components/UploadWidget';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
   
    <Route path="/feed" element={<Home />} />,
    <Route path="/signup" element={<Signup />} />
    <Route path='/upload' element={<UploadWidget/>}/>
    <Route path="/" element={<Login />} />
    </Route>
   
  )
);

const App = () => {
  return <RouterProvider router={myRouter} />;
};

export default App;
