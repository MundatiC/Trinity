const express = require("express");

const authRouter = express.Router();


const { registerUser, loginUser, logoutUser } = require("../controllers/authController");




const newUserMiddleware = require("../middlewares/newUserMiddleware");
authRouter.post("/register", newUserMiddleware, registerUser)



authRouter.post("/login", loginUser)


authRouter.get("/logout", logoutUser)

module.exports = authRouter;