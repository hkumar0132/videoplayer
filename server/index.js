const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoURI = require('./config/key');
const checkAuth = require('./middleware/check-auth');

mongoose.connect(mongoURI, {
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true}
);

// Used to log everything like GET, POST, etc requests
app.use(morgan('dev'));
// It ensures that we prevent Cross-Origin Resource Sharing(CORS) errors
// If client made req on localhost:4000, and received res from server which
// has localhost:3000 req will fail. It is always the case with RESTful APIs
// So, we attach headers from servers to client to tell browser that it's OK
app.use(cors());
// extended: true allows to parse extended body with rich data in it
// We will use false only allows simple bodies for urlencoded data
app.use(bodyParser.urlencoded({extended: false}));
// Extracts json data and makes it easy readable to us
app.use(bodyParser.json());

// To make uploads folder publically available with '/api/videos' route
app.use('/api/videos', express.static('media/uploads'));

// Routes
app.use('/api/signIn', require('./routes/Authentication/signIn'));
app.use('/api/register', require('./routes/Authentication/register'));
app.use('/api/videoGet', checkAuth, require('./routes/Video/videoGet'));
app.use('/api/videoPost', checkAuth, require('./routes/Video/videoPost'));

module.exports = app;