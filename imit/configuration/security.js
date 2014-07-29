/**
 * Security configuration
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var service = require('../services/admin');
var crypt = require('../services/utils/crypt');



//function userIsAllowed(req) {
//  if (req.session.authenticated != null && req.session.authenticated == true) {
//    return true;
//  } else {
//    return false;
//  }
//};


var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/admin/login');
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  var promise = service.findAdmin(email);
  promise.then(function(user){
    done(undefined, user);
  }, function(err){
    done(err, undefined);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
  var promise = service.findAdmin(username);
  promise.then(function(user) {
    if(!user) {
      return done(null, false, { message: 'Unknown user ' + username });
    }
    crypt.comparePasswords(password, user.password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  }, function(err) {
    if (err) return done(err);
  });
}));

module.exports = {

  /**
   * Initialize security
   * @param app Express app
   */
  init: function (app) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.all('/admin/restricted', ensureAuthenticated, function(req, res, next){
      next();
    });

//    app.all('/admin/restricted*', function(req, res, next) {
//      if(userIsAllowed (req)){
//          next();
//      } else {
//        res.statusCode = 403;
//        next(new Error('Forbidden'));
//      }
//    });
  },

  getPassport: function() {
    return passport;
  }
};

