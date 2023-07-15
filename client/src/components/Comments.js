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
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState({});
  const [showReplies, setShowReplies] = useState(false);

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
    setShowReplyInput(!showReplyInput);
    setReplyCommentId(commentId);
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        CommentId: replyCommentId,
        Content: replyContent,
      };

      await axios.post('http://localhost:5051/replyToComment', data, {
        withCredentials: true,
      });

      // Reset the reply form
      setShowReplyInput(false);
      setReplyCommentId(null);
      setReplyContent('');
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const handleRepliesButtonClick = async (commentId) => {
    try {
      const response = await axios.get(`http://localhost:5051/replies/${commentId}`, {
        withCredentials: true,
      });
      console.log(response)

      setReplies(response.data.data || []) 
      setShowReplies(!showReplies);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleLikeClick = async (commentId) => {
    try {
      await axios.post(
        `http://localhost:5051/likeComment`,
        { CommentId: commentId },
        {
          withCredentials: true,
        }
      );
      // Update the comment's like count or other relevant data
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <div key={comment.CommentId} className="comment">
          <div className="comment__avatar">
            <Avatar src={comment.ProfilePicture} />
          </div>
          <div className="comment__body">
            <div className="comment__header">
              <div className="comment__headerText">
                <h3>
                  {comment.Username}{' '}
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
              <div className="reply">
                <ReplyIcon fontSize="small" onClick={() => handleReplyClick(comment.CommentId)} />
                <span>{comment.ReplyCount}</span>
              </div>

              <div className="like">
                <FavoriteBorderIcon
                  fontSize="small"
                  onClick={() => handleLikeClick(comment.CommentId)}
                />
                <span>{comment.LikeCount}</span>
              </div>
            </div>

            {/* Reply form */}
            {showReplyInput && replyCommentId === comment.CommentId && (
              <div className="reply-form">
                <form onSubmit={handleReplySubmit}>
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                  />
                  <button type="submit">Reply</button>
                </form>
              </div>
            )}

            {/* Display replies */}
            {showReplies &&( replies.map((reply) => (
              <div key={reply.ReplyId} className="comment reply-comment">
                <div className="comment__avatar">
                  <Avatar src={reply.ProfilePicture} />
                </div>
                <div className="comment__body">
                  <div className="comment__header">
                    <div className="comment__headerText">
                      <h3>
                        {reply.User}{' '}
                        {reply.User && (
                          <span className="comment__headerSpecial">
                            <VerifiedUserIcon className="comment__badge" /> @{reply.User}
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="comment__headerDescription">
                      <p>{reply.Content}</p>
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
          {/* Toggle button for replies */}
          <button className="toggle-replies-button" onClick={() => handleRepliesButtonClick(comment.CommentId)}>
            {replies[comment.CommentId] ? 'Hide Replies' : 'Show Replies'}
          </button>
        </div>
      ))}
    </>
  );
}




export default Comments;
