/**
 * Admin registration controllers
 */
var validator = require('../../services/validator');
var service = require('../../services/admin');
var settings = require('../../configuration/settings');
var messages = require('../../messages/validation');
var Request = require('../../models/request');
var sessionUtils = require('../utils/session');

module.exports = {

  register: function(req, res) {
    res.render('admin/register', {});
  },

  postJson: function(req, res) {
    var form = req.body;
    var errors = validator.adminRegister(form);
    if (errors != null) {
      res.json({
        errorMessage: messages.admin.register.errorErrors,
        errors: errors
      });
    } else {
      var adminRequest = new Request();
      adminRequest.email = form.email;
      adminRequest.password = form.password;
      adminRequest.firstName = form.firstName;
      adminRequest.lastName = form.lastName;
      var promise = service.saveRequest(adminRequest);
      promise.then(function(){
        sessionUtils.addMessage({success: messages.admin.register.success}, req);
        var redirectUrl = settings.SITE_ADDRESS + "/admin/login";
        res.json({
          successMessage: messages.admin.register.success,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        if (err.code == 'ER_DUP_ENTRY') {
          errorMessage = messages.admin.register.errorDuplicate;
        } else {
          errorMessage = messages.admin.register.errorDatabase;
        }
        res.json({
          errorMessage: errorMessage,
          errors: errors
        });
      });
    }
  },

  apply: function(req, res) {
    var code = req.query.code;
    if (code == null) {
      sessionUtils.addMessage({error: messages.admin.apply.codeNull}, req);
      res.redirect('login');
    }
    var promise = service.applyRequest(code);
    promise.then(function(data) {
      sessionUtils.addMessage({success: messages.admin.apply.codeApplied}, req);
      res.redirect('login');
    }, function(err) {
      sessionUtils.addMessage({error: messages.admin.apply.codeApplyError}, req);
      res.redirect('login');
    });
  },

  decline: function(req, res) {
    var code = req.query.code;
    if (code == null) {
      sessionUtils.addMessage({error: messages.admin.decline.codeNull}, req);
      res.redirect('login');
    }
    var promise = service.declineRequest(code);
    promise.then(function(data) {
      sessionUtils.addMessage({success: messages.admin.decline.codeDeclined}, req);
      res.redirect('login');
    }, function(err) {
      sessionUtils.addMessage({error: messages.admin.decline.codeDeclineError}, req);
      res.redirect('login');
    });
  }
};