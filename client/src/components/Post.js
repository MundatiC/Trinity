import React, { forwardRef, useState, useEffect, useRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import axios from "axios";

const Post = forwardRef(({ post, onClick }, ref) => {
  const handlePostClick = () => {
    onClick(post);
  };
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(post.IsLiked || false); // Track the like status
  const videoRef = useRef(null);

  const imageUrls = post.ImageUrls?.split(",") || [];
  const videoUrls = post.VideoUrls?.split(",") || [];

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
    const PostId ={ PostId: post.PostId};
    console.log(PostId)

    try {
      
      const response = await axios.post(
        `http://localhost:5051/likePost`,
        PostId,
        {
          withCredentials: true,
        }
      );

      setIsLiked(!isLiked); // Toggle the like status
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
      <div className="post__avatar">
        <Avatar src={post.ProfilePicture} />
      </div>
      <div className="post__body">
        <div className="post__header" onClick={handlePostClick}>
          <div className="post__headerText">
            <h3>
              {post.User}{" "}
              {post.User && (
                <span className="post__headerSpecial">
                  <VerifiedUserIcon className="post__badge" /> @{post.User}
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
                )}
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
            <span>{post.CommentCount}</span>
          </div>
          <div className={`like ${isLiked ? "liked" : ""}`} onClick={handleLikeClick}>
            <FavoriteBorderIcon fontSize="medium" />
            <span>{post.LikeCount}</span>
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
