// Middleware to protection rute API 
// This middlware check the user for creadential token
const config = require('../config/keys');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
	const token = req.header('x-auth-token');

	// Check to token
	if(!token) return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
	  // Verify token
	  const decoded = jwt.verify(token, config.jwtSecret);
	  // Add user from payload
	  console.log(decoded);
	  req.user = decoded; // give user the credential token (jwt)
	  next();
	} catch(e) {
	  res.status(400).json({ msg: 'Token is not valid' });
	}
}

module.exports = auth;