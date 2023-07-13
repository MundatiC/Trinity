import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";
import axios from "axios";

const data =  [
    {
        "PostId": 34,
        "UserId": 79,
        "Content": "Bang",
        "CreatedAt": "2023-07-06T15:37:31.840Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 15,
        "UserId": 79,
        "Content": "Bang",
        "CreatedAt": "2023-07-06T13:08:55.200Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 1,
        "CommentCount": 0,
        "ImageUrls": "",
        "VideoUrls": ""
    },
    {
        "PostId": 14,
        "UserId": 79,
        "Content": "Wicked",
        "CreatedAt": "2023-07-06T12:41:59.973Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 13,
        "UserId": 79,
        "Content": "Hi yaal",
        "CreatedAt": "2023-07-06T12:38:06.817Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 12,
        "UserId": 70,
        "Content": "Check out this image and video!",
        "CreatedAt": "2023-07-06T12:31:29.137Z",
        "User": "Mbugua",
        "ProfilePicture": "profile.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 11,
        "UserId": 70,
        "Content": "Check out this image and video!",
        "CreatedAt": "2023-07-04T09:55:06.147Z",
        "User": "Mbugua",
        "ProfilePicture": "profile.jpg",
        "LikeCount": 1,
        "CommentCount": 13,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 20,
        "UserId": 79,
        "Content": "Bang",
        "CreatedAt": "2023-07-06T15:37:31.840Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 56,
        "UserId": 79,
        "Content": "Bang",
        "CreatedAt": "2023-07-06T13:08:55.200Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 1,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 67,
        "UserId": 79,
        "Content": "Wicked",
        "CreatedAt": "2023-07-06T12:41:59.973Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 68,
        "UserId": 79,
        "Content": "Hi yaal",
        "CreatedAt": "2023-07-06T12:38:06.817Z",
        "User": "MbuguaLenn",
        "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 69,
        "UserId": 70,
        "Content": "Check out this image and video!",
        "CreatedAt": "2023-07-06T12:31:29.137Z",
        "User": "Mbugua",
        "ProfilePicture": "profile.jpg",
        "LikeCount": 0,
        "CommentCount": 0,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    },
    {
        "PostId": 70,
        "UserId": 70,
        "Content": "Check out this image and video!",
        "CreatedAt": "2023-07-04T09:55:06.147Z",
        "User": "Mbugua",
        "ProfilePicture": "profile.jpg",
        "LikeCount": 1,
        "CommentCount": 13,
        "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
        "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
    }
]


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
