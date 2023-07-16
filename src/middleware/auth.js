import jwt from 'jsonwebtoken'
import { jwt_secret } from '../../config/config.js';
import Admin from '../models/survey_admin.model.js';

export default function authenticateToken(request, res, next) {
  // Get the token from the request authorization header
  const token = request.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, jwt_secret, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    // Store the decoded token in the request for further use
    const admin = await Admin.findByPk(decoded.admin_id)
    if(!admin) return res.status(403).json({ message: 'Failed to authenticate token' });
    
    request.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
}
