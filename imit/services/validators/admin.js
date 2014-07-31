/**
 * Admin validator
 */
var validator = require('validator');
var message = require('../utils/message');

module.exports = {

  adminLogin: function(form, locale) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = message.msg('validation.admin.login.emailNull', locale);
    } else if (!validator.isEmail(form.email)) {
      errors.email = message.msg('validation.admin.login.emailIncorrect', locale);
    }
    if(validator.isNull(form.password)) {
      errors.password = message.msg('validation.admin.login.passwordNull', locale);
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  },

  restorePassword: function(form, locale) {
    var errors = {};
    if(validator.isNull(form.email)) {
      errors.email = message.msg('validation.admin.restore.emailNull', locale);
    } else if (!validator.isEmail(form.email)) {
      errors.email = message.msg('validation.admin.restore.emailIncorrect', locale);
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  },

  newPassword: function(form, locale) {
    var errors = {};
    if(validator.isNull(form.code)) {
      errors.code = message.msg('validation.admin.newPassword.codeNull', locale);
    }
    if(!validator.isLength(form.password, 6, 50)) {
      errors.password = message.msg('validation.admin.newPassword.passwordLength', locale);
    }
    if(form.password != form.passwordRepeated) {
      errors.passwordRepeated = message.msg('validation.admin.newPassword.passwordsNotEqual', locale);
    }
    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};