import React from 'react'
import PostNotClick from './PostNotClick'
import Comments from './Comments'
import './PostDetails.css'

function PostDetails({ post }) {
    return (
        <div className='postDetails'>
            <PostNotClick post={post} />
            <Comments post={post} />
        </div>

    )
}

export default PostDetails