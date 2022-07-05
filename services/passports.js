const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');
const User2 = mongoose.model('users2');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.serializeUser((user2, done) => {
  done(null, user2.id);
});

passport.deserializeUser((id, done) => {
  User2.findById(id).then(user2 => {
    done(null, user2);
  });
});

passport.use(
  new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id })
  if(existingUser){
    return done(null, existingUser);
  }
  const user = await new User({ googleId: profile.id }).save()
  done(null,user);
  }
)
);

passport.use(new LocalStrategy(function verify(username, password, done) {
      User2.findOne({username: username}, function(err, user2) {
        if(err) return done(err);
        if(!user2) return done(null, false, { message: 'Incorect username!' });

        bcrypt.compare(password, user2.password, function(err, res){
          if(err) return done(err);

          if(res === false) return done(null, false, {message: 'Incorrect password.'});

          return done(null, user2);
        });
      });
  }));
