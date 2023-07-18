import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import './Comments.css';

function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (post) {
          const response = await axios.get(`http://localhost:5051/post/${post.PostId}`, {
            withCredentials: true,
          });
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [post]);

  return (
    <>
      <h1>Comments</h1>
      {comments.map((comment) => (
        <Comment key={comment.CommentId} comment={comment} />
      ))}
    </>
  );
}

export default Comments;
