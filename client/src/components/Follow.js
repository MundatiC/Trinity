import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button } from '@material-ui/core';
import './Follow.css'
import { useNavigate } from 'react-router-dom';

function Follow() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchToFollowUsers();
  }, []);

  const fetchToFollowUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5051/tofollow', {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleClick = (user) => {
    navigate(`/home/profiles/${user.UserId}`)
  }

  const handleFollow = async (userId) => {
    const data = {
        FollowerUserId: userId
    }
    const response = await axios.post('http://localhost:5051/follow', data, {
        withCredentials:true,
    })

    console.log(response)
  };

  return (
    <div className='container'>
      <h1>Users to Follow</h1>
      {users.map((user) => (
        <div key={user.UserId} className="user-card" onClick={() => handleClick( user )}>
            <div className='user-details'>
          <Avatar src={user.ProfilePicture} alt="" />
          <div className="user-card__info">
            <h2>{user.Username}</h2>
           
          </div>
          </div>
          <Button
            variant="contained"
            onClick={() => handleFollow(user.UserId)}
            className='follow-button'
          >
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Follow;
