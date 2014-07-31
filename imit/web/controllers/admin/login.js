/**
 * Admin Login controllers
 */
var validator = require('../../../services/validators/admin');
var settings = require('../../../configuration/settings');
var service = require('../../../services/admin');
var message = require('../../../services/utils/message');
var sessionUtils = require('../../utils/session');
var passport = require('passport');

module.exports = {

  home: function(req, res) {
    res.redirect('/admin/login');
  },

  login: function(req, res) {
    var message = sessionUtils.readMessage(req);
    res.render('admin/login', {flashMessage: message});
  },

  postJson: function(req, res, next) {
    var form = req.body;
    var locale = req.session.locale;
    var successMessage;
    var errorMessage;
    var redirectUrl;
    var errors = validator.adminLogin(form, locale);
    if (errors != null) {
      errorMessage = message.msg('validation.admin.login.errorErrors', locale);
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      //TODO: it would be great to refactor this
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          errorMessage = message.msg('validation.admin.login.errorDatabase', locale);
          res.json({
            errorMessage: errorMessage
          });
        }
        if (!user) {
          errorMessage = message.msg('validation.admin.login.errorIncorrect', locale);
          res.json({
            errorMessage: errorMessage
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            errorMessage = message.msg('validation.admin.login.errorDatabase', locale);
            res.json({
              errorMessage: errorMessage
            });
          } else {
            successMessage = message.msg('validation.admin.login.success', locale);
            redirectUrl = settings.SITE_ADDRESS + "/admin/restricted/";
            res.json({
              successMessage: successMessage,
              redirectUrl: redirectUrl
            });
          }
        });
      })(req, res, next);
    }
  }
};