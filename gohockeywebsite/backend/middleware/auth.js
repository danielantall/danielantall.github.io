const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Use an environment variable in production

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get the token from "Authorization: Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify and decode the token
    req.user = decoded; // Attach the decoded user info to `req.user`
    next(); // Move to the next middleware or controller
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { authenticateUser };
