const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passports');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(session({
   secret: 'somethingsecretgoeshere',
   resave: false,
   saveUninitialized: true,
   cookieSession: { secure: true }
}));

//app.use(
//  cookieSession({
  //  maxAge: 30 * 24 *60 * 60 * 1000,
    //keys: [keys.cookieKey]
  //})
//);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
