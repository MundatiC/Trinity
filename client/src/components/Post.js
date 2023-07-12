import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const Post = forwardRef(({ post }, ref) => {
  // Convert comma-separated ImageUrls string to an array
  const imageUrls = post.ImageUrls?.split(",") || [];

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

        {imageUrls.length > 0 && (
          <div className="image">
            {imageUrls.map((url) => (
              <img key={url} src={url} alt="" />
            ))}
          </div>
        )}

        <div className="post__footer">
          <ChatBubbleOutlineIcon fontSize="small" />
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
});

export default Post;
