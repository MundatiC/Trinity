function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect to the login page or send an error response
      res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  }

module.exports = requireAuth;
  