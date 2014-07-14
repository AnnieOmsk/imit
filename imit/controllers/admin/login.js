/**
 * Admin Login controllers
 */
var validator = require('../../services/validator');
var settings = require('../../configuration/settings');
var service = require('../../services/admin');
var messages = require('../../messages/validation.json');

module.exports = {

  home: function(req, res) {
    res.redirect('/admin/login');
  },

  login: function(req, res) {
    res.render('admin/login', {});
  },

  postJson: function(req, res) {
    var form = req.body;
    var successMessage;
    var errorMessage;
    var redirectUrl;
    var errors = validator.adminLogin(form);
    if (errors != null) {
      errorMessage = messages.admin.login.errorErrors;
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      var promise = service.loginCheck(form.email, form.password);
      promise.then(function(user) {
        if (user == null) {
          errorMessage = messages.admin.login.errorIncorrect;
          res.json({
            errorMessage: errorMessage
          });
        } else {
          successMessage = messages.admin.login.success;
          redirectUrl = settings.SITE_ADDRESS + "/admin/restricted/";
          req.session.authenticated = true;
          req.session.user = user;
          res.json({
            successMessage: successMessage,
            redirectUrl: redirectUrl
          });
        }
      }, function (err) {
        errorMessage = messages.admin.login.errorDatabase;
        res.json({
          errorMessage: errorMessage
        });
      });
    }
  }
};