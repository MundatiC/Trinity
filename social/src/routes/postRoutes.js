const express = require("express");

const postRouter = express.Router();

const { getFeed, getUserPosts } = require("../controllers/postControllers");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");


postRouter.use(sessionAuthorization)
postRouter.get("/feed", getFeed);
postRouter.get('/myposts', getUserPosts)

module.exports =  postRouter ;