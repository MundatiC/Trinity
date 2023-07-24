const express = require("express");

const followRouter = express.Router();

const {getFollowing, getFollowers,followUser, unfollowUser, getUsersNotFollowed, checkFollow} = require("../controllers/followControllers");
const { sessionAuthorization } = require("../middlewares/sessionAuthorization");

followRouter.use(sessionAuthorization)
followRouter.get("/following", getFollowing);

followRouter.get("/followers", getFollowers);

followRouter.post("/follow", followUser);

followRouter.post("/unfollow", unfollowUser);

followRouter.get("/tofollow", getUsersNotFollowed);

followRouter.get("/checkfollow/:FollowerUserId", checkFollow);



module.exports = followRouter;