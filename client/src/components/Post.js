import React, { forwardRef, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Post = forwardRef(({ post }, ref) => {
  const [comment, setComment] = useState(""); // State for the comment input
  const [showCommentInput, setShowCommentInput] = useState(false); // State to toggle comment input

  // Convert comma-separated ImageUrls string to an array
  const imageUrls = post.ImageUrls?.split(",") || [];
  const videoUrls = post.VideoUrls?.split(",") || [];

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Handle comment submission here (e.g., send to backend)
    console.log(comment);
    setComment("");
  };

  const handleCommentIconClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  return (
    <div className="post" ref={ref}>
      <div className="post__avatar">
        <Avatar src={post.ProfilePicture} />
      </div>
      <div className="post__body">
        <div className="post__header">
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

        {imageUrls.length > -1 && (
          <div className="image">
            {imageUrls.map((url) => (
              <img key={url} src={url} alt="" />
            ))}

          </div>
        )}
        {/* {videoUrls.length > -1 && (
          <div className="video">
         {videoUrls.map((url) => (
              <video key={url} src={url} alt="" />
            ))}

            </div>
        )} */}

        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" onClick={handleCommentIconClick} />
          <FavoriteBorderIcon fontSize="small" />
        </div>

        {/* Comment input */}
        {showCommentInput && (
          <div className="comment">
            <Avatar src={post.ProfilePicture} />
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
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
