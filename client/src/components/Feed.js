import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";




function Feed() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  const handlePostClick = (post) => {
    setActivePost(post);
    console.log('post clicked')
  };
  

  useEffect(() => {
    // setPosts(data);
    // console.log(posts)
    const fetchPosts = async () => {
        
        
        
      try {
        const response = await axios.get("http://localhost:5051/feed",
        {
          withCredentials: true,
        });
        console.log(response)
        setPosts(response.data.data);
        console.log(posts)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post key={post.PostId} post={post} onClick={handlePostClick} />
         
        ))}
      </FlipMove>

       {/* Render the active post and its comments */}
       {activePost && (
        <div className="active-post">
          <Post post={activePost} />
          {/* Add the component to display comments here */}
        </div>
      )}
    </div>
  );
}

export default Feed;
