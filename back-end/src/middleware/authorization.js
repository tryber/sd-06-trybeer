const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.TOKEN_SECRET || 'segredodogrupo7';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: 'missing auth token' });
    return;
  }

  try {
    jwt.verify(authorization, secret, (err, email) => { 
      if (err) return res.status(401).json({ message: 'jwt malformed' });
      
      req.email = email;
      next();
    });
  } catch (err) {
    next(err);
  }
};
