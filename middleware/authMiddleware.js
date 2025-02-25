const { verifyToken } = require('../config/auth');

//Save the token to cookie and send it to the client
const authMiddleware = (req, res, next) => {
  // const token = req.header('Authorization')?.replace('Bearer ', '');
  const token = req.headers.cookie.replace("token=", "").replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;