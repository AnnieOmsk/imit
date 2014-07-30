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
  },

  restorePassword: function(form) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = messages.admin.restore.emailNull;
    } else if (!validator.isEmail(form.email)) {
      errors.email = messages.admin.restore.emailIncorrect;
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  },

  newPassword: function(form) {
    var errors = {};
    if(validator.isNull(form.code)) {
      errors.code = messages.admin.newPassword.codeNull;
    }
    if(!validator.isLength(form.password, 6, 50)) {
      errors.password = messages.admin.newPassword.passwordLength;
    }
    if(form.password != form.passwordRepeated) {
      errors.passwordRepeated = messages.admin.newPassword.passwordsNotEqual;
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};