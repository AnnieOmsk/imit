/**
 * Security configuration
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var service = require('../services/admin');
var sessionUtils = require('../web/utils/session');
var crypt = require('../services/utils/crypt');
var message = require('../services/utils/message');
var LOGIN_PATH = '/admin/login';
var PROTECTED_PATH = '/admin/restricted';

/**
 * Checks if current user is already authenticated
 * @param req   Request
 * @param res   Response
 * @param next  Next method
 */
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    sessionUtils.setMessage({error: message.msg('common.forbidden.error', req.session.locale)}, req);
    res.redirect(LOGIN_PATH);
  }
};

/**
 * Serialize user to store it in cookie
 * Required for Passport
 */
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

/**
 * Deserialize user, using cookie information
 * Required for Passport
 */
passport.deserializeUser(function(email, done) {
  var promise = service.findAdmin(email);
  promise.then(function(user){
    done(undefined, user);
  }, function(err){
    done(err, undefined);
  });
});

/**
 * Main passport configuration
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
  var promise = service.findAdmin(username);
  promise.then(function(user) {
    // No such user
    if(!user) {
      done(null, false, {});
    }
    // There is some, but wwe need to check his password
    crypt.comparePasswords(password, user.password, function(err, isMatch) {
      if (err) {
        done(err);
      }
      // Oh great, validation passed!
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {});
      }
    });
  }, function(err) {
    if (err) {
      done(err);
    }
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
    app.all(PROTECTED_PATH, ensureAuthenticated, function(req, res, next){
      next();
    });
  }
};

