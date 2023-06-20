require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRETT=require('./key')
// Middleware to check for valid JWT token
function authenticateToken(req, res, next) {
  const { headers } = req
  const authHeader = headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log("Token might be null " + token
    )
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token,JWT_SECRETT, (err, decoded) => {
    if (err) {
    //   res.redirect('/login');
    //   console.log("Invalid token", err)
      return res.status(403).json({ message: 'Invalid token' });
    }
    next();
  });
}
module.exports = authenticateToken;