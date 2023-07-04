const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const { v4 } = require("uuid");


const authRouter = require("./src/routes/authRoutes");
const { secure } = require("./src/config/emailConfig");


const app = express()

app.use(express.json())

app.use(cors())
const oneDay = 1000 * 60 * 60 * 24
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    genid: ()=> v4(),
    cookie:{
        maxAge: oneDay,
        httpOnly: false,
        secure: false
    }
}))



app.set("view engine", "ejs")

app.get(
    "/", 
    (req, res, next) => {
        let cont = true;
    if (cont) {
      console.log("Hello from the middleware");
      next();
    } else {
      res.send("Error logged from middleware");
    }
    },
    (req, res) => {
        
        res.send("Ok")
    }
);

app.use(authRouter)

app.use("*", (req, res, next) => {
    const error = new Error("Route Not found");
    next({
      status: 404,
      message: error.message,
    });
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status).json(error.message);
  });
  
  const port = process.env.PORT;
  
  app.listen(port, () => console.log(`Server on port: ${port}`));

