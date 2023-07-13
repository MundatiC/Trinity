const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const { v4 } = require("uuid");
const sql = require("mssql");
const config = require("./src/config/config");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis")


const authRouter = require("./src/routes/authRoutes");



const app = express()

app.use(express.json())
app.use(cors({
  origin:'http://localhost:3000', 
  credentials:true,       
  optionSuccessStatus:200
}))

async function connectToDatabase() {

  try {
    const pool = await sql.connect(config)
    console.log("Connected to the database")

    const redisClient = createClient();
    redisClient.connect()
    console.log("Connected to Redis")

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: ''
    })

    const oneDay = 1000 * 60 * 60 * 24
    app.use((req, res, next) => { req.pool = pool; next() })
    app.use(session({
      store: redisStore,
      secret: process.env.SECRET,
      saveUninitialized: false,
      genid: () => v4(),
      resave: true,
      rolling: true,
      unset: 'destroy',
      cookie: {
        httpOnly: false,
        maxAge: oneDay,
        secure: false,
        domain: 'localhost'
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

  } catch (error) {
    console.log('Error connecting to the database')
    console.log(error)
  }

}

connectToDatabase();

