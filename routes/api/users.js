const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../../config/keys');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

/**
 *  @route        POST api/users
 *  @description  Register new user
 *  @access       Public
 */
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
	// status code 400
	return res.status(400).json({ msg: 'Please entar all fields' });
  }

   // Check for existing user
	User.findOne({ email }).then(user => {
	  if(user) return res.status(400).json({ msg: 'User already exists' });

	  const newUser = new User({
	  	name,
	  	email,
	  	password
	  });

	  // Create salt & hash the password
	  bcrypt.genSalt(15, (err, salt) => {
	  	// hashing the password
	    bcrypt.hash(newUser.password, salt, (err, hash) => {
	      if(err) throw err;
	      newUser.password = hash;
	      // save new user into database
	      newUser.save().then(user => {

	      	// make payload token sign to user
	      	// 3 pair of json payload
	      	jwt.sign(
	      	  { id: user.id }, 
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
	});
});
 
module.exports = router;