function sessionAuthorization(req, res, next) {
    const authorized = req.session?.authorized;
  
    if (req.session && authorized) {
      // Session is valid and authorized
      console.log(req.session.user);
      next(); // Proceed to the next middleware or route handler
    } else {
      // Session is invalid or unauthorized
      
      res.status(401).send("You are not logged in");
    }
  }

module.exports = {sessionAuthorization};
  