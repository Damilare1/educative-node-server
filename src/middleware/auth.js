import jwt from 'jsonwebtoken'
import { jwt_secret } from '../../config/config.js';

export default function authenticateToken(req, res, next) {
  // Get the token from the request authorization header
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    // Store the decoded token in the request for further use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
}
