const express = require('express')

const profileRouter = express.Router();

const { editProfile, showProfile,changePassword, getLikedPosts, getUser, Profile} = require("../controllers/profileControllers")
const {sessionAuthorization} = require("../middlewares/sessionAuthorization")

profileRouter.use(sessionAuthorization)

profileRouter.put("/editProfile", editProfile)

profileRouter.get("/showProfile/:id", showProfile )

profileRouter.get("/getLikedPosts/:id", getLikedPosts)

profileRouter.put("/changePassword", changePassword)

profileRouter.get("/getUser", getUser )

profileRouter.get('/profile', Profile)



module.exports = profileRouter