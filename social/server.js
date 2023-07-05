const express = require("express");
require("dotenv").config();
const cors = require("cors");
const  postRouter  = require("./src/routes/postRoutes");






const app = express()

app.use(express.json())

app.use(cors())






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

app.use(postRouter)

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

