const express = require("express");

const postRouter = express.Router();

const { getFeed, getUserPosts, createPost } = require("../controllers/postControllers");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


postRouter.use(sessionAuthorization)

postRouter.get("/feed", getFeed);

postRouter.get('/myposts', getUserPosts)

postRouter.post("/createPost", createPost);

module.exports =  postRouter ;