import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReplyIcon from '@material-ui/icons/Reply';
import './Comments.css';
import moment from 'moment';

function Comment({ comment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.ReplyCount);
  const [likeCount, setLikeCount] = useState(comment.LikeCount);
  const [liked, setLiked] = useState(false);

  const handleLikeClick = async (commentId) => {
    try {
      await axios.post(
        `http://localhost:5051/likeComment`,
        { CommentId: commentId },
        {
          withCredentials: true,
        }
      );

      setLiked(!liked);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const checkLiked = async () => {
    try {
      const data = {
        CommentId: comment.CommentId,
      };
      const response = await axios.post(`http://localhost:5051/checkLikeComment`, data, {
        withCredentials: true,
      });
      setLiked(response.data.response);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
    checkLiked();
  }, []);

  const handleRepliesButtonClick = async (commentId) => {
    try {
      if (!showReplies) {
        const response = await axios.get(`http://localhost:5051/replies/${commentId}`, {
          withCredentials: true,
        });
        setReplies(response.data.data || []);
      }

      setShowReplies(!showReplies);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleReplyClick = (commentId) => {
    setShowReplyInput(!showReplyInput);
    setReplyCommentId(commentId);
  };

  const formatTimestamp = (timestamp) => {
    const currentTime =  moment(); // Current time in East African Time (EAT)
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
      setReplyCount(replyCount + 1);
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  return (
    <div className="comment">
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
                  <VerifiedUserIcon className="comment__badge" /> @{comment.Username} {" · "}
                  <span>{formatTimestamp(comment.CreatedAt)}</span>
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
            <span>{replyCount}</span>
          </div>

          <div className="like">
            <FavoriteIcon
              fontSize="small"
              className={` ${liked ? 'liked' : ''}`}
              onClick={() => handleLikeClick(comment.CommentId)}
            />
            <span>{likeCount}</span>
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
        {showReplies &&
          replies.map((reply) => (
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
                          <VerifiedUserIcon className="comment__badge" /> @{reply.User} {" · "}
                          <span>{formatTimestamp(reply.CreatedAt)}</span>
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
          ))}
      </div>
      {/* Toggle button for replies */}
      <button className="toggle-replies-button" onClick={() => handleRepliesButtonClick(comment.CommentId)}>
        {showReplies ? 'Hide Replies' : 'Show Replies'}
      </button>
    </div>
  );
}

export default Comment;
