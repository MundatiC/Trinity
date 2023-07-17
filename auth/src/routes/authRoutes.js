const express = require("express");

const authRouter = express.Router();


const { registerUser, loginUser, logoutUser, deleteAccount } = require("../controllers/authController");

const { sessionAuthorization } = require("../middlewares/sessionAuthorization");




const newUserMiddleware = require("../middlewares/newUserMiddleware");

authRouter.post("/register", newUserMiddleware, registerUser)



authRouter.post("/login", loginUser)

authRouter.use(sessionAuthorization)
authRouter.get("/logout", logoutUser)

authRouter.post("/deleteAccount", deleteAccount)



module.exports = authRouter;