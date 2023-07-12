import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import './Home.css'


export const Home = () => {
  return (
    <div className='awesome'>
    <Sidebar/>
    <Feed/>
    

    </div>
  )
}


export default Home