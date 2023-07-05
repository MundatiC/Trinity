const express = require("express");

const followRouter = express.Router();

const {getFollowing, getFollowers,followUser, unfollowUser} = require("../controllers/followControllers");


followRouter.get("/following", getFollowing);

followRouter.get("/followers", getFollowers);

followRouter.post("/follow", followUser);

followRouter.post("/unfollow", unfollowUser);



module.exports = followRouter;