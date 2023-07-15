import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";

function Feed({ onPostClick }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5051/feed", {
          withCredentials: true,
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    onPostClick(post);
  };

  const MemoizedPost = React.memo(Post);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <MemoizedPost
            key={post.PostId}
            post={post}
            onClick={() => handlePostClick(post)}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
