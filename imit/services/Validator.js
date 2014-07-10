/**
 * Forms validation
 */
var validator = require('validator');

module.exports = {

  adminRegister: function(form) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = "Заполните, пожалуйста, email адрес";
    } else if (!validator.isEmail(form.email)) {
      errors.email = "Некорректный email-адрес";
    }
    if(!validator.isLength(form.password, 6, 50)) {
      errors.password = "Пароль должен быть не менее 6 и не более 50 символов";
    }
    if(form.password != form.passwordRepeated) {
      errors.passwordRepeated = "Пароли должны совпадать";
    }
    if(validator.isNull(form.firstName)) {
      errors.firstName = "Заполните, пожалуйста, имя";
    }
    if(validator.isNull(form.lastName)) {
      errors.lastName = "Заполните, пожалуйста, фамилию";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  },

  adminLogin: function(form) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = "Заполните, пожалуйста, email адрес";
    } else if (!validator.isEmail(form.email)) {
      errors.email = "Некорректный email-адрес";
    }
    if(validator.isNull(form.password)) {
      errors.password = "Заполните, пожалуйста, пароль";
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};
