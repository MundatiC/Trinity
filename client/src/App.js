import './App.css';
import  Home  from './components/Home'
import  Login  from './components/Login'
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
   
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Login />} />
    </Route>
   
  )
);

const App = () => {
  return <RouterProvider router={myRouter} />;
};

export default App;
