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
    const UserId = req.session?.user.UserId;
    const { Content, ImageUrls, VideoUrls } = req.body;
  
    const { pool } = req;
  
    try {
      if (pool.connected) {
        const request = pool.request();
  
        request.input("UserId", UserId)
          .input("Content", Content)
          .input("ImageUrls", ImageUrls)
          .input("VideoUrls", VideoUrls);
  
        let result = await request.execute("AddPost");
  
        if (result.rowsAffected[0] > 0) {
          res.json({
            success: true,
            message: "Post created successfully",
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
            const result = await request.execute('GetPost');
            const comments = await request.execute('GetCommentsByPostId');
            console.log(result)
            res.json({
               success: true,
                message: "Retrieved specific post",
                data: result.recordset,
                comments: comments.recordset
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}



async function deletePost(req,res){
    const UserId = req.session?.user.UserId
    const{ PostId }   = req.body;
    
    const { pool } = req
    try {
       
        if (pool.connected) {
            const request = pool.request();
            request.input('PostId', PostId)
                    .input('UserId',UserId);
            const result = await request.execute('DeletePost');
            console.log(result)
            res.json({
               success: true,
                message: "Deleted post successfully",
                data: result.recordset,
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
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
        res.status(500).json({  error: error.message });
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
        res.status(500).json({ error: error.message });
    }

}

async function replytoComment (req, res) {
    const UserId = req.session?.user.UserId
    const { CommentId, Content } = req.body;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request.input('CommentId', CommentId)
                .input('UserId', UserId)
                .input('Content', Content)
            const result = await request.execute('AddReply');
            console.log(result)
            res.json({
                success: true,
                message: "Replied to comment successfully"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

async function getRepliesForComment(req,res){
   
    const { CommentId } = req.params;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request
                .input('CommentId', CommentId)
            const result = await request.execute('GetRepliesByCommentId');
            console.log(result)
          
           
                res.json({
                    success: true,
                    message: "Retrieved replies successfully",
                    data: result.recordset
                })
           
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({  error: error.message });
        }

}

async function likeComment(req, res){
    const UserId = req.session?.user.UserId
    const { CommentId } = req.body;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request.input('UserId', UserId)
                .input('CommentId', CommentId)
            const result = await request.execute('LikeComment');
            console.log(result)
            console.log(result.recordset[0].Response)
            if(result.recordset[0].Response === 'Liked'){
                res.json({
                    success: true,
                    message: "Comment liked successfully"
                })
            }else{
                res.json({
                    success: true,
                    message: "Comment unliked successfully"
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({  error: error.message });
    }

}

async function searchByUsername(req,res){
    
    const { username } = req.body;
    const { pool } = req

    try {
        
        if (pool.connected) {
            const request = pool.request();
            request.input('username', username);
            const result = await request.execute('SearchUsersByUsername');
            console.log(result)
            res.json({
                success: true,
                message: "Searched users successfully",
                data: result.recordset
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}



module.exports = { getFeed, getUserPosts, createPost, getPost,deletePost, likePost, commentOnPost,getRepliesForComment, likeComment, replytoComment, searchByUsername };