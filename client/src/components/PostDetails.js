import React from 'react'
import PostNotClick from './PostNotClick'
import Comments from './Comments'

function PostDetails({ post }) {
    return (
        <>
            <PostNotClick post={post} />
            <Comments post={post} />
        </>

    )
}

export default PostDetails