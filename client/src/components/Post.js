import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = forwardRef(
  ({post}, ref) => {
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
                {console.log(post.User)}
                <span className="post__headerSpecial">
                  { <VerifiedUserIcon className="post__badge" />} @
                  {post.User}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{post.Content}</p>
            </div>
          </div>
          
            <img src={post.ImageUrls[0]} alt="NAAh" />
          {/* {post.ImageUrls.map((single) => (
          <img src={single} alt="NAAh" />
         
        ))} */}
          
          
        
         
        
        
          
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            
            <FavoriteBorderIcon fontSize="small" />
            
          </div>
        </div>
      </div>
    );
  }
);

export default Post;