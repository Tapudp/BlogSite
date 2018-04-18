const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use( new GoogleStrategy({
    // optins for google startegy
    callbackURL: '/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if(currentUser){
          // already have the user
          done(null, currentUser)
          console.log('user is: '+currentUser);
        } else {
          // if not, create it in our database
         new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.image.url
        }).save().then(newUser =>{
          console.log('new user has been created '+newUser);
          done(null, newUser);     
        });
        }
      })

      // console.log('callback function has fired');
      // console.log(profile);
    }
));