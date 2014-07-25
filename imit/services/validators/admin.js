/**
 * Admin validator
 */
var validator = require('validator');
var messages =  require('../../messages/validation');

module.exports = {

  adminLogin: function(form) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = messages.admin.login.emailNull;
    } else if (!validator.isEmail(form.email)) {
      errors.email = messages.admin.login.emailIncorrect;
    }
    if(validator.isNull(form.password)) {
      errors.password = messages.admin.login.passwordNull;
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};