/**
 * Admin registration controllers
 */
var validator = require('../../services/validator');
var service = require('../../services/admin');
var Request = require('../../models/request');

module.exports = {

  register: function(req, res) {
    res.render('admin/register', {});
  },

  postJson: function(req, res) {
    var form = req.body;
    var successMessage;
    var errorMessage;
    var errors = validator.adminRegister(form);
    if (errors != null) {
      errorMessage = "Пожалуйста, исправьте ошибки";
    } else {
      var adminRequest = new Request();
      adminRequest.email = form.email;
      adminRequest.password = form.password;
      adminRequest.firstName = form.firstName;
      adminRequest.lastName = form.lastName;
      var promise = service.saveRequest(adminRequest);
      promise.then(function(){
        successMessage = "Ваши данные сохранены, ждите ответа";
        res.json({
          successMessage: successMessage,
          errorMessage: errorMessage,
          errors: errors
        });
      }, function(err) {
        if (err.code == 'ER_DUP_ENTRY') {
          errorMessage = "Заявка с таким email-адресом уже была подана ранее";
        } else {
          errorMessage = "Ошибка сохранения данных, пожалуйста, повторите позже";
        }
        res.json({
          successMessage: successMessage,
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
    promise.then(function(date) {
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
    promise.then(function(date) {
      res.redirect('login');
    }, function(err) {
      res.redirect('login');
    });
  }
};