const express = require('express')

const profileRouter = express.Router();

const { editProfile, showProfile,changePassword, getLikedPosts} = require("../controllers/profileControllers")
const {sessionAuthorization} = require("../middlewares/sessionAuthorization")

profileRouter.use(sessionAuthorization)

profileRouter.put("/editProfile", editProfile)

profileRouter.get("/showProfile", showProfile )

profileRouter.get("/getLikedPosts", getLikedPosts)

profileRouter.post("/changePassword", changePassword)



module.exports = profileRouter