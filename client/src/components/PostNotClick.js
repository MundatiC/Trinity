import React, { forwardRef, useState, useEffect, useRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function PostNotClick  ( { PostId, refreshComments }) {
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(); // Track the like status
  const videoRef = useRef(null);
  const [likeCount, setLikeCount] = useState();
  const [commentCount, setCommentCount] = useState();
  const navigate = useNavigate()

  const getPost = async () => {
    try {
        const response = await axios.get(`http://localhost:5051/post/${PostId}`, {
          withCredentials: true,
        });
        console.log(response.data.data[0])
        setPost(response.data.data[0]);
        setCommentCount(response.data.data[0].CommentCount)
        setLikeCount(response.data.data[0].LikeCount)
        console.log(post)
        
    } catch (error) {

    }
  }

  useEffect(()=>{
    getPost()
  },[PostId])



  console.log(likeCount)
 
  //[post, setPost

 
  


  const imageUrls = post.ImageUrls?.split(",") || [];
  const videoUrls = post.VideoUrls?.split(",") || [];

  const checkLike = async () => {
    const data = {
      PostId: post.PostId,
    }
    try {
      const response = await axios.post(
        "http://localhost:5051/checkLike",
        data,
        { withCredentials: true }
      );
      console.log(response.data.response)
      console.log(isLiked);
      setIsLiked(response.data.response)
    } catch (error) { }
  };

  useEffect(() => {
    checkLike();
  }, [post.PostId]);

  
  

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const createdTime = new Date(timestamp);
    const timeDifference = Math.abs(currentTime - createdTime);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const PostId = post.PostId;
    console.log(comment);
    const data = {
      PostId: PostId,
      Content: comment,
    };
    console.log(data);

    const response = await axios.post(
      "http://localhost:5051/commentOnPost",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(response);

    setComment("");
    setCommentCount(commentCount + 1)
    refreshComments()
  };

  const handleCommentIconClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handlePlayPause = () => {
    const videoElement = videoRef.current;

    if (videoElement.paused) {
      videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoHover = () => {
    setIsHovered(!isHovered);
  };

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleLikeClick = async () => {
    const PostId = { PostId: post.PostId };
    console.log(PostId)

    try {

      const response = await axios.post(
        `http://localhost:5051/likePost`,
        PostId,
        {
          withCredentials: true,
        }
      );

      setIsLiked(!isLiked);
      if(isLiked){
        setLikeCount(likeCount - 1) 
      }else{
        setLikeCount(likeCount + 1) 
      }
      // Toggle the like status
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      };
    }
  }, []);

  

  // Function to handle going back
  const handleGoBack = () => {
   navigate(-1)
  };

  return (
    <div className="post" >
       <div className="back-icon" onClick={handleGoBack}>
        <i className="fa fa-arrow-left"></i>
      </div>
      <div className="post__avatar">
        <Avatar src={post.ProfilePicture} />
      </div>
      <div className="post__body">
        <div className="post__header" >
          <div className="post__headerText">
            <h3>
              {post.User}{" "}
              {post.User && (
                <span className="post__headerSpecial">
                  <VerifiedUserIcon className="post__badge" /> @{post.User}
                  <span> {formatTimestamp(post.CreatedAt)}</span>
                </span>
              )}
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{post.Content}</p>
          </div>
        </div>

        {imageUrls.length > 0 && (
          <div className="image">
            {imageUrls.map((url) => (
              <img key={url} src={url} alt="" />
            ))}
          </div>
        )}

        {videoUrls.length > 0 && (
          <div className="video">
            {videoUrls.map((url) => (
              <div
                key={url}
                className="video-wrapper"
                onMouseEnter={handleVideoHover}
                onMouseLeave={handleVideoHover}
              >
                <video src={url} ref={videoRef} muted={isMuted} />
                {isHovered && (
                  <>
                   <div className="video-overlay">
                    {isPlaying ? (
                      <FaPause
                        className="play-pause-icon"
                        onClick={handlePlayPause}
                      />
                    ) : (
                      <FaPlay
                        className="play-pause-icon"
                        onClick={handlePlayPause}
                      />
                    )}
                  </div>

                  <div className="mute-button">
                  {isMuted ? (
                    <FaVolumeMute
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  ) : (
                    <FaVolumeUp
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  )}
                </div>
                  </>
                 
                  
                )}
               
              </div>
            ))}
          </div>
        )}

        <div className="post__footer">
          <div className="chat">
            <ChatBubbleOutlineIcon
              fontSize="medium"
              onClick={handleCommentIconClick}
            />
            <span>{commentCount}</span>
          </div>
          <div className={`like ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}>
            <FavoriteIcon fontSize="medium" className="icon"  />
            <span>{likeCount}</span>
          </div>
        </div>

        {showCommentInput && (
          <div className="comment">
            <Avatar src={post.ProfilePicture} />
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                required
                onChange={handleCommentChange}
              />
              <button type="submit">Post</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostNotClick;
