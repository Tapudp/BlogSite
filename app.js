const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const keys = require('./config/keys');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
const workRoutes = require('./routes/blog-route.js');
const profileRoutes = require('./routes/profile-route');
const bodyParser = require('body-parser');

const app = express();


// setup db
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongoDB');
});

//set up view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded( { extended: true } ));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieSession.cookieKey]
}))

// initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
// set up the routes
app.use('/', workRoutes);
app.use('/profile', profileRoutes);
module.exports = app;