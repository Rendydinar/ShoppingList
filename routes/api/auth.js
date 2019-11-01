const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/keys');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

/**
 *  @route        POST api/auth
 *  @description  Auth  user (Login)
 *  @access       Public
 */
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if(!email || !password) {
	  // status code 400
	  return res.status(400).json({ msg: 'Please entar all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
	  if(!user) return res.status(400).json({ msg: 'User Does not exists' });

	  // Validate password
	  // bcrypt compare
	  bcrypt.compare(password, user.password)
	    .then(isMatch => {
	      if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
		  
	      // if user match
	      // give token with payload
		  jwt.sign(
	      	{ id: user.id }, // payload untuk menandakan user didalam database berdasarkan id.
	      	config.jwtSecret, // jwt secret key
	      	{ expiresIn: 3600 }, // time expire (1 hour)
	      	(err, token) => {
	      	  if(err) throw err;
		      	res.json({
		      	  token,
	  			  user: {
	  			  	id: user.id,
	  			  	name: user.name,
	  			  	email: user.email
	  			  }
		      	});
	      	  }
	      );	      
	  });
	});
});

/**
 *  @route        GET api/auth/user
 *  @description  GET user data
 *  @access       Private
 */
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // ambil data user di database, kecuali password
    .then(user => res.json(user));
});
 
module.exports = router;