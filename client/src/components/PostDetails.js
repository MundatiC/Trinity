import React from 'react'
import PostNotClick from './PostNotClick'
import Comments from './Comments'
import './PostDetails.css'
import { useParams } from 'react-router-dom'

function PostDetails() {
    const { PostId } = useParams();
    console.log(PostId)

    return (
        <div className='postDetails'>
            <PostNotClick PostId={PostId} />
            <Comments PostId={PostId} />
        </div>

    )
}

export default PostDetails