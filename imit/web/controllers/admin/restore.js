/**
 * Admin restore password controllers
 */
var validator = require('../../../services/validators/admin');
var settings = require('../../../configuration/settings');
var service = require('../../../services/admin');
var message = require('../../../services/utils/message');
var sessionUtils = require('../../utils/session');

module.exports = {

  restore: function(req, res) {
    res.render('admin/restore');
  },

  emailSubmit: function(req, res) {
    var form = req.body;
    var locale = req.session.locale;
    var errorMessage;
    var errors = validator.restorePassword(form, locale);
    if (errors != null) {
      errorMessage = message.msg('validation.admin.restore.errorErrors', locale);
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      var promise = service.restorePassword(form.email, locale);
      promise.then(function(){
        var successMessage = message.msg('validation.admin.restore.success', locale);
        sessionUtils.setMessage({success: successMessage}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        if (err.message === 'WRONG_CODE') {
          errorMessage = message.msg('validation.admin.restore.errorIncorrect', locale);
        } else {
          errorMessage = message.msg('validation.admin.restore.errorDatabase', locale);
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
      sessionUtils.setMessage({
        error: message.msg('validation.admin.newPassword.codeNull', req.session.locale)
      }, req);
      res.redirect('login');
    } else {
      res.render('admin/new-password', {restoreCode: code});
    }
  },

  newPasswordSubmit: function(req, res) {
    var form = req.body;
    var locale = req.session.locale;
    var errorMessage;
    var errors = validator.newPassword(form, locale);
    if (errors != null) {
      errorMessage = message.msg('validation.admin.newPassword.errorErrors', locale);
      res.json({
        errorMessage: errorMessage,
        errors: errors
      });
    } else {
      var promise = service.newPassword(form.code, form.password, locale);
      promise.then(function(data) {
        var successMessage = message.msg('validation.admin.newPassword.passwordSet', locale);
        sessionUtils.setMessage({success: successMessage}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        if (err.message === 'WRONG_CODE') {
          errorMessage = message.msg('validation.admin.newPassword.errorIncorrect', locale);
        } else {
          errorMessage = message.msg('validation.admin.newPassword.errorDatabase', locale);
        }
        res.json({
          errorMessage: errorMessage
        });
      });
    }
  }
};