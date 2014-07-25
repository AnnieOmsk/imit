/**
 * Admin request validator
 */
var validator = require('validator');
var messages =  require('../../messages/validation');

module.exports = {

  requestValidator: function(form) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = messages.admin.register.emailNull;
    } else if (!validator.isEmail(form.email)) {
      errors.email = messages.admin.register.emailIncorrect;
    }
    if(!validator.isLength(form.password, 6, 50)) {
      errors.password = messages.admin.register.passwordLength;
    }
    if(form.password != form.passwordRepeated) {
      errors.passwordRepeated = messages.admin.register.passwordsNotEqual;
    }
    if(validator.isNull(form.firstName)) {
      errors.firstName = messages.admin.register.firstNameNull;
    }
    if(validator.isNull(form.lastName)) {
      errors.lastName = messages.admin.register.lastNameNull;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};