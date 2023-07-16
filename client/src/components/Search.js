import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './Search.css'

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await axios.get(`http://localhost:5051/search/${searchTerm}`, {
        withCredentials: true,
      });

      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className='search'>
       <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search" />
     <div className='results'>
    

<ul className="search-results">
  {searchResults.map((result) => (
    <li key={result.UserID} className="search-result">
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
