const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const config = require('./config');
const config = require('./config/keys');
const 		
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Enviroiment Variabel
require('dotenv').config();

// CORS Middleware
app.use(cors());

// DB Config
const db = config.mongoURI;

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth')); 

// Serve static assets if in production 
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // get all route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set PORT Number
const PORT = process.env.PORT || 5000;

// App Listen
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
