import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import './Comments.css';
import PostNotClick from './PostNotClick';
import FlipMove from "react-flip-move";


function Comments({ PostId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      if (PostId) {
        const response = await axios.get(`http://localhost:5051/post/${PostId}`, {
          withCredentials: true,
        });
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [PostId]);

  const refreshComments = () => {
    fetchComments()
  }

  return (
    <>
       <PostNotClick PostId={PostId} refreshComments={refreshComments} />
      <h1>Comments</h1>
      <FlipMove>
      {comments.map((comment) => (
        <Comment key={comment.CommentId} comment={comment} />
      ))}
      </FlipMove>
    </>
  );
}

export default Comments;
