/**
 * Admin Login controllers
 */
var validator = require('../../services/validator');

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
    var errors = validator.adminLogin(form);
    if (errors != null) {
      errorMessage = "Неправильные данные";
    } else {
      successMessage = "Сюда добавим проверку в базе";
    }
    res.json({
      successMessage: successMessage,
      errorMessage: errorMessage,
      errors: errors
    });
  }
};