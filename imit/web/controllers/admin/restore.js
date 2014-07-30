/**
 * Admin restore password controllers
 */
var validator = require('../../../services/validators/admin');
var settings = require('../../../configuration/settings');
var service = require('../../../services/admin');
var messages = require('../../../messages/validation');
var sessionUtils = require('../../utils/session');

module.exports = {

  restore: function(req, res) {
    res.render('admin/restore');
  },

  emailSubmit: function(req, res) {
    var form = req.body;
    var errorMessage;
    var errors = validator.restorePassword(form);
    if (errors != null) {
      errorMessage = messages.admin.restore.errorErrors;
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      var promise = service.restorePassword(form.email);
      promise.then(function(){
        sessionUtils.setMessage({success: messages.admin.restore.success}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: messages.admin.restore.success,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        if (err.message === 'WRONG_CODE') {
          errorMessage = messages.admin.restore.errorIncorrect;
        } else {
          errorMessage = messages.admin.restore.errorDatabase;
        }
        res.json({
          errorMessage: errorMessage
        });
      });
    }
  },

  newPassword: function(req, res) {
    var code = req.query.code;
    if (code == null) {
      sessionUtils.setMessage({error: messages.admin.newPassword.codeNull}, req);
      res.redirect('login');
    } else {
      res.render('admin/new-password', {restoreCode: code});
    }
  },

  newPasswordSubmit: function(req, res) {
    var form = req.body;
    var errorMessage;
    var errors = validator.newPassword(form);
    if (errors != null) {
      errorMessage = messages.admin.newPassword.errorErrors;
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      var promise = service.newPassword(form.code, form.password);
      promise.then(function(data) {
        sessionUtils.setMessage({success: messages.admin.newPassword.passwordSet}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: messages.admin.newPassword.passwordSet,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        if (err.message === 'WRONG_CODE') {
          errorMessage = messages.admin.newPassword.errorIncorrect;
        } else {
          errorMessage = messages.admin.newPassword.errorDatabase;
        }
        res.json({
          errorMessage: errorMessage
        });
      });
    }
  }
};