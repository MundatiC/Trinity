const { createClient } = require('redis');
const RedisStore = require("connect-redis").default;

async function sessionAuthorization(req, res, next) {

  try {
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis")

    let cookie = req.headers['cookie']
    
    let sessionID = cookie.substring(16, 52)
    let session = await redisClient.get(sessionID)
    
    if(session == null){
      res.status(401).send("You are not logged in");
    } else{
      let json_session = JSON.parse(session)
   

    const authorized = json_session?.authorized;
    // console.log(authorized)
  
    if ( authorized) {
      // Session is valid and authorized
    
      req.session = json_session;
      next(); // Proceed to the next middleware or route handler
    } else {
      // Session is invalid or unauthorized
      
      res.status(401).send("You are not logged in");
    }

    }
    
  } catch (error) {
    res.send(error.message)
    
  }
    
  }

module.exports = {sessionAuthorization};
  