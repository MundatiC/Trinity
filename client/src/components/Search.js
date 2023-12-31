import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './Search.css'
import { useNavigate } from 'react-router-dom';

function Search({onSearchResultClick}) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    
    setSearchTerm(searchTerm);
    if(searchTerm === '') {
      setSearchResults([]);
    }

    try {
      const response = await axios.get(`http://localhost:5051/search/${searchTerm}`, {
        withCredentials: true,
      });

      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleClick = (userId) => {
    navigate(`/home/profiles/${userId}`)
  }

  return (
    <div className='search'>
       <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
     <div className='results'>
    

<ul className="search-results">
  {searchResults.map((result) => (
    <li key={result.UserID} className="search-result"
    onClick={() => handleClick( result.UserID)}>
      <div className="avatar-container">
        <Avatar src={result.ProfilePicture} alt={result.UserName} />
        <VerifiedUserIcon 
        fontSize='small'
        className="verified-icon" 
       />
      </div>
      <span className="username">{result.UserName}</span>
    </li>
  ))}
</ul>
     </div>
    </div>
  );
}

export default Search;
