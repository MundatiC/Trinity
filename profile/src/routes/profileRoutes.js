const express = require('express')

const profileRouter = express.Router();

const { editProfile, showProfile, deleteAccount} = require("../controllers/profileControllers")
const {sessionAuthorization} = require("../middlewares/sessionAuthorization")

profileRouter.use(sessionAuthorization)

profileRouter.put("/editProfile", editProfile)

profileRouter.get("/showProfile", showProfile )

profileRouter.post("/deleteAccount", deleteAccount)

module.exports = profileRouter