const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('users2');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google',{
    scope: ['profile','email']
  })
  );

  app.get(
    '/auth/google/callback',
     passport.authenticate('google'),
     (req, res) => {
       res.redirect('/surveys');
     }
   );

  app.get('/api/logout', (req, res) =>{
    req.logout(req.user, err => {
   if(err) return next(err);
   res.redirect('/');
 });
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.post('/auth/signup', async (req, res) =>{

    const exists = await User.findOne({username: req.body.username})

    if(exists) {res.redirect('/'); return;}

    bcrypt.getSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash("password", salt, function (err,hash) {
      const user = new User({
        username: req.body.username,
        password: hash
      });
     user.save();

      res.redirect('/auth/login');
    });
  });
});


  app.get('/auth/login', passport.authenticate('local',{
    successRedirect: '/surveys',
    failureRedirect: '/auth/login'
  }));
};
