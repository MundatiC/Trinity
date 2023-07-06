const mssql = require("mssql");
const config = require("../config/config");
const upload = require('../utills/upload');

async function getFeed(req, res) {
    console.log(req.session?.user.UserId)
    const UserId = req.session?.user.UserId

    const { pool } = req
    try {
        

        if (pool.connected) {
            const request = pool.request();

            request.input('SpecificUserId', UserId)

            let result = await request.execute('GetPostsFromFollowedUsers');
            console.log(result)

            res.json({
                success: true,
                message: "Retrieved posts from followed users",
                data: result.recordset
            })
        }
    } catch (error) {
        res.send(error.message)

    }

}

async function getUserPosts(req, res) {
    const UserId = req.session?.user.UserId
    const { pool } = req
    try {
      

        if (pool.connected) {
            const request = pool.request();

            request.input('SpecificUserId', UserId)

            let result = await request.execute('GetPostsFromSpecific');
            console.log(result)

            res.json({
                success: true,
                message: "Retrieved posts for specific user",
                data: result.recordset
            })
        }
    } catch (error) {
        res.send(error.message)

    }

}



async function createPost(req, res) {
    const UserId = req.session?.user.UserId
    const { Content, ImageUrls, VideoUrls } = req.body;

    const { pool } = req

    try {
       
        if (pool.connected) {

            let uploadedImageUrls = [];
            if (ImageUrls) {
                const imageUrlsArray = ImageUrls.split(',');
                if (imageUrlsArray.length === 1) {
                    const imageUrl = await upload(imageUrlsArray[0], 'image');
                    uploadedImageUrls.push(imageUrl);
                } else {
                    uploadedImageUrls = await Promise.all(imageUrlsArray.map((path) => upload(path, 'image')));
                }
            }

            // Upload videos
            let uploadedVideoUrls = [];
            if (VideoUrls) {
                const videoUrlsArray = VideoUrls.split(',');
                if (videoUrlsArray.length === 1) {
                    const videoUrl = await upload(videoUrlsArray[0], 'video');
                    uploadedVideoUrls.push(videoUrl);
                } else {
                    uploadedVideoUrls = await Promise.all(videoUrlsArray.map((path) => upload(path, 'video')));
                }
            }


            const request = pool.request();

            


            request.input('UserId', UserId)
                .input('Content', Content)
                .input('ImageUrls', uploadedImageUrls.join(','))
                .input('VideoUrls', uploadedVideoUrls.join(','))

                let result = await request.execute('AddPost');    
                
            if(result.rowsAffected[0] > 0){
                res.json({
                    success: true,
                    message: "Post created successfully"
                    
                })
            }
            

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getPost(req, res) {
    const  PostId  = req.params.id;
    console.log(PostId)
    const { pool } = req
    try {
       
        if (pool.connected) {
            const request = pool.request();
            request.input('PostId', PostId);
            const result = await request.execute('GetPostWithComments');
            console.log(result)
            res.json({
               success: true,
                message: "Retrieved post with comments",
                data: result.recordset
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function likePost(req, res) {
    const UserId = req.session?.user.UserId
    const { PostId } = req.body;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request.input('UserId', UserId)
                .input('PostId', PostId)
            const result = await request.execute('LikePost');
            console.log(result)
            console.log(result.recordset[0].Response)
            if(result.recordset[0].Response === 'Liked'){
                res.json({
                    success: true,
                    message: "Post liked successfully"
                })
            }else{
                res.json({
                    success: true,
                    message: "Post unliked successfully"
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function commentOnPost(req, res) {
    const UserId = req.session?.user.UserId
    const { PostId, Content } = req.body;
    const { pool } = req

    try {
       
        if (pool.connected) {
            const request = pool.request();
            request.input('UserId', UserId)
                .input('PostId', PostId)
                .input('Content', Content)
            const result = await request.execute('AddComment');
            console.log(result)
            res.json({
                success: true,
                message: "Commented on post successfully"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

async function replytoComment (req, res) {
    const UserId = req.session?.user.UserId
    const { PostId,CommentId, Content } = req.body;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request.input('PostId', PostId)
                .input('UserId', UserId)
                .input('ParentCommentId', CommentId)
                .input('Content', Content)
            const result = await request.execute('AddComment');
            console.log(result)
            res.json({
                success: true,
                message: "Replied to comment successfully"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



module.exports = { getFeed, getUserPosts, createPost, getPost, likePost, commentOnPost, replytoComment };