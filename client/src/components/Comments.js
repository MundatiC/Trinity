import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import './Comments.css';
import ReplyIcon from '@material-ui/icons/Reply';

function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5051/post/${post.PostId}`, {
          withCredentials: true,
        });
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post.PostId]);

  const handleReplyClick = (commentId) => {
    // Handle reply button click
  };

  const handleLikeClick = (commentId) => {
    // Handle like button click
  };

  return (
    <>
    <h1>Comments</h1>
    {comments.map((comment) => (
        <div key={comment.CommentId} className="comment" >
        <div className="comment__avatar">
          <Avatar src={comment.ProfilePicture} />
        </div>
        <div className="comment__body">
          <div className="comment__header">
            <div className="comment__headerText">
              <h3>
                {comment.Username}{" "}
                {comment.Username && (
                  <span className="comment__headerSpecial">
                    <VerifiedUserIcon className="comment__badge" /> @{comment.Username}
                  </span>
                )}
              </h3>
            </div>
            <div className="comment__headerDescription">
              <p>{comment.Content}</p>
            </div>
          </div>
    
         
          <div className="comment__footer">
            <ReplyIcon fontSize="small" onClick={() => handleReplyClick(comment.CommentId)} />
            <FavoriteBorderIcon fontSize="small"
            onClick={() => handleLikeClick(comment.CommentId)} />
          </div>
    
          {/* {showCommentInput && (
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
          )} */}
        </div>
      </div>

    ))}
 
    </>
   
  );
}

export default Comments;
