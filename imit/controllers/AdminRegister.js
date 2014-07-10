/**
 * Admin registration controllers
 */
var validator = require('../services/Validator');

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
      successMessage = "Ваши данные сохранены, ждите ответа";
    }
    res.json({
      successMessage: successMessage,
      errorMessage: errorMessage,
      errors: errors
    });
  }
};