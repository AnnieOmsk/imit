/**
 * Admin registration controllers
 */
var validator = require('../../../services/validators/request');
var service = require('../../../services/admin');
var settings = require('../../../configuration/settings');
var message = require('../../../services/utils/message');
var Request = require('../../../models').Request;
var sessionUtils = require('../../utils/session');

module.exports = {

  register: function(req, res) {
    res.render('admin/register', {});
  },

  postJson: function(req, res) {
    var form = req.body;
    var locale = req.session.locale;
    var errors = validator.requestValidator(form, locale);
    if (errors != null) {
      res.json({
        errorMessage: message.msg('validation.admin.register.errorErrors', locale),
        errors: errors
      });
    } else {
      var adminRequest = new Request();
      adminRequest.email = form.email;
      adminRequest.firstName = form.firstName;
      adminRequest.lastName = form.lastName;
      adminRequest.password = form.password;
      var promise = service.saveRequest(adminRequest, locale);
      promise.then(function(){
        var successMessage = message.msg('validation.admin.register.success', locale);
        sessionUtils.setMessage({success: successMessage}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        if (err.code == 'ER_DUP_ENTRY') {
          errorMessage = message.msg('validation.admin.register.errorDuplicate', locale);
        } else {
          errorMessage = message.msg('validation.admin.register.errorDatabase', locale);
        }
        res.json({
          errorMessage: errorMessage
        });
      });
    }
  },

  apply: function(req, res) {
    var code = req.query.code;
    var locale = req.session.locale;
    if (code == null) {
      sessionUtils.setMessage({error: message.msg('validation.admin.apply.codeNull', locale)}, req);
      res.redirect('login');
    }
    var promise = service.applyRequest(code, locale);
    promise.then(function(data) {
      sessionUtils.setMessage({success: message.msg('validation.admin.apply.codeApplied', locale)}, req);
      res.redirect('login');
    }, function(err) {
      sessionUtils.setMessage({error: message.msg('validation.admin.apply.codeApplyError', locale)}, req);
      res.redirect('login');
    });
  },

  decline: function(req, res) {
    var code = req.query.code;
    var locale = req.session.locale;
    if (code == null) {
      sessionUtils.setMessage({error: message.msg('validation.admin.decline.codeNull', locale)}, req);
      res.redirect('login');
    }
    var promise = service.declineRequest(code, locale);
    promise.then(function(data) {
      sessionUtils.setMessage({success: message.msg('validation.admin.decline.codeDeclined', locale)}, req);
      res.redirect('login');
    }, function(err) {
      sessionUtils.setMessage({error: message.msg('validation.admin.decline.codeDeclineError', locale)}, req);
      res.redirect('login');
    });
  }
};