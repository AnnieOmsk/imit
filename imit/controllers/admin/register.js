/**
 * Admin registration controllers
 */
var validator = require('../../services/validator');
var service = require('../../services/admin');
var messages = require('../../messages/validation.json');
var Request = require('../../models/request');

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
        res.json({
          successMessage: messages.admin.register.success,
          errors: errors
        });
      }, function(err) {
        var errorMessage;
        if (err.code == 'ER_DUP_ENTRY') {
          errorMessage = messages.admin.registter.errorDuplicate;
        } else {
          errorMessage = messages.admin.registter.errorDatabase;
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
      res.redirect('login');
    }
    var promise = service.applyRequest(code);
    promise.then(function(data) {
      res.redirect('login');
    }, function(err) {
      res.redirect('login');
    });
  },

  decline: function(req, res) {
    var code = req.query.code;
    if (code == null) {
      res.redirect('login');
    }
    var promise = service.declineRequest(code);
    promise.then(function(data) {
      res.redirect('login');
    }, function(err) {
      res.redirect('login');
    });
  }
};