const express = require("express");

const postRouter = express.Router();

const { getFeed, getUserPosts, createPost, getPost,deletePost, likePost, commentOnPost, replytoComment } = require("../controllers/postControllers");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


postRouter.use(sessionAuthorization)

postRouter.get("/feed", getFeed);

postRouter.get('/myposts', getUserPosts)

postRouter.post("/createPost", createPost);

postRouter.get("/post/:id", getPost)

postRouter.post("/likePost", likePost)

postRouter.post("/commentOnPost", commentOnPost)

postRouter.post("/replytoComment", replytoComment)

postRouter.put("/deletePost", deletePost)



module.exports =  postRouter ;