import React, { forwardRef, useState, useEffect, useRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import { toast, ToastContainer} from 'react-toastify'

const Post = forwardRef(({ post,refreshPosts }, ref) => {
  const navigate = useNavigate();
  const handlePostClick = () => {
    navigate(`/home/post/${post.PostId}`
    );
  };
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(); // Track the like status
  const videoRef = useRef(null);
  const [likeCount, setLikeCount] = useState(post.LikeCount);
  const [commentCount, setCommentCount] = useState(post.CommentCount);
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  


  const imageUrls = post.ImageUrls?.split(",") || [];
  const videoUrls = post.VideoUrls?.split(",") || [];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5052/getUser', {
          withCredentials: true,
        });
        const { UserId } = response.data.data[0];
        console.log(UserId);
        post.UserId === UserId ? setShowDelete(true) : setShowDelete(false)
       
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

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


  const formatTimestamp = (timestamp) => {
    const currentTime = moment(); // Current time in East African Time (EAT)
    console.log(currentTime)
    const createdTime = moment(timestamp).utcOffset(-3)._d; // Created time from the database in UTC time zone
    console.log(createdTime)

    const minutesDifference = Math.abs(currentTime.diff(createdTime, 'minutes'));
    const hoursDifference = Math.abs(currentTime.diff(createdTime, 'hours'));
    const daysDifference = Math.abs(currentTime.diff(createdTime, 'days'));

    if (minutesDifference < 1) {
      return 'Just now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
    }
  };


  const handleCommentChange = (event) => {
    setComment(event.target.value);
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
  };

  const handleCommentIconClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const toggleDeleteDropdown = () => {
    setShowDeleteDropdown((prevState) => !prevState);
  };

  const handlePostDelete = async () => {
    const PostId = post.PostId;
    console.log(PostId)
    try {
      const response = await axios.delete(`http://localhost:5051/deletePost/${PostId}`, {
        withCredentials: true,
      })
      console.log(response)
      toast.success('Post deleted successfully')
      refreshPosts()
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
      if (response.status === 200) {
        setIsLiked(!isLiked);
        if (isLiked) {
          setLikeCount(likeCount - 1)
        } else {
          setLikeCount(likeCount + 1)
        }
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


  return (
    <div className="post" ref={ref}>


      <div className="post__body">

        <div className="post__header" >
         
            <div className="post__headerText">
            <Link to={`/home/profiles/${post.UserId}`} style={{ textDecoration: 'none' }}>
              <div className="post__headerText2">
              <div className="post__avatar">
                <Avatar src={post.ProfilePicture} />
              </div>
              <h3>
                {post.User}{" "}
                {post.User && (
                  <span className="post__headerSpecial">
                    <VerifiedUserIcon className="post__badge" /> @{post.User} {" · "}
                    <span> {formatTimestamp(post.CreatedAt)}</span>
                  </span>
                )}
              </h3>
              </div>
              </Link>
             
             {showDelete && (<div className="post__delete" onClick={ () => toggleDeleteDropdown()}>
            <span>...</span>
            {showDeleteDropdown && (
              <div className="post__delete-dropdown">
                <span onClick={ () => handlePostDelete(post.PostId)}>Delete</span>
              </div>
            )}
          </div>)}
            </div>
          

         

          <div className="post__headerDescription" onClick={() => handlePostClick()}>
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
            <FavoriteIcon fontSize="medium" className="icon" />
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
});

export default Post;
