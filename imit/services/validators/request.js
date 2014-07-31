/**
 * Admin request validator
 */
var validator = require('validator');
var message = require('../utils/message');

module.exports = {
  
  requestValidator: function(form, locale) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = message.msg('validation.admin.register.emailNull', locale);
    } else if (!validator.isEmail(form.email)) {
      errors.email = message.msg('validation.admin.register.emailIncorrect', locale);
    }
    if(!validator.isLength(form.password, 6, 50)) {
      errors.password = message.msg('validation.admin.register.passwordLength', locale);
    }
    if(form.password != form.passwordRepeated) {
      errors.passwordRepeated = message.msg('validation.admin.register.passwordsNotEqual', locale);
    }
    if(validator.isNull(form.firstName)) {
      errors.firstName = message.msg('validation.admin.register.firstNameNull', locale);
    }
    if(validator.isNull(form.lastName)) {
      errors.lastName = message.msg('validation.admin.register.lastNameNull', locale);
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};