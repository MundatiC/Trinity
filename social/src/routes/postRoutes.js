const express = require("express");

const postRouter = express.Router();

const { getFeed, getUserPosts, createPost, getPost,deletePost, likePost, getRepliesForComment, commentOnPost, likeComment, checkLike, replytoComment, searchByUsername, checkLikeComment } = require("../controllers/postControllers");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


postRouter.use(sessionAuthorization)

postRouter.get("/feed", getFeed);

postRouter.get('/myposts/:id', getUserPosts)

postRouter.post("/createPost", createPost);

postRouter.get("/post/:id", getPost)

postRouter.post("/likePost", likePost)

postRouter.get("/replies/:CommentId", getRepliesForComment)

postRouter.post("/commentOnPost", commentOnPost)

postRouter.post("/likeComment", likeComment)

postRouter.post("/replytoComment", replytoComment)

postRouter.put("/deletePost", deletePost)

postRouter.get("/search/:term", searchByUsername)

postRouter.post("/checkLike", checkLike)

postRouter.post("/checkLikeComment", checkLikeComment)



module.exports =  postRouter ;