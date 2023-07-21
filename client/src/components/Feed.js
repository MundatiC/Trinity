import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";

function Feed({ onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  const fetchPosts = async () => {
    try {
      let response;
      if (activeTab === "home") {
        response = await axios.get("http://localhost:5051/feed", {
          withCredentials: true,
        });
      } else if (activeTab === "forYou") {
        response = await axios.get("http://localhost:5051/foryou", {
          withCredentials: true,
        });
      }

      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const refreshPosts = () =>{
    fetchPosts();
  }

  const handlePostClick = (post) => {
    onPostClick(post);
  };

  const MemoizedPost = React.memo(Post);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="feed">
     

      <TweetBox refreshPosts={refreshPosts}  />
      <div className="feed__header">
        <div
          className={`feed__tab ${activeTab === "forYou" ? "active" : ""}`}
          onClick={() => handleTabChange("forYou")}
        >
          For You
        </div>
        <div
          className={`feed__tab ${activeTab === "home" ? "active" : ""}`}
          onClick={() => handleTabChange("home")}
        >
          Following
        </div>
      </div>

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
