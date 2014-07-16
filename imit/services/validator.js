/**
 * Forms validation
 */
var validator = require('validator');
var messages =  require('../messages/validation');

module.exports = {

  adminRegister: function(form) {
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
  },

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

  graduateLive: function(form) {
    var errors = {};
    var fieldOut = form["_fieldout"];
    var keys = ['fullName', 'img', 'occupancy', 'department', 'graduatedIn', 'lead', 'fullLead', 'text'];
    var lastFilled = keys.indexOf(fieldOut);

    if(validator.isNull(form[keys[0]]) && lastFilled >= 0) {
      errors.fullName = messages.graduate.save.fullNameNull;
    }
    if(validator.isNull(form[keys[1]]) &&  lastFilled >= 1) {
      errors.img = messages.graduate.save.imgNull;
    }
    if(validator.isNull(form[keys[2]]) &&  lastFilled >= 2) {
      errors.occupancy = messages.graduate.save.occupancyNull;
    }
    if(validator.isNull(form[keys[5]]) &&  lastFilled >= 5) {
      errors.lead = messages.graduate.save.leadNull;
    }
    if(validator.isNull(form[keys[6]]) &&  lastFilled >= 6) {
      errors.leadFull = messages.graduate.save.leadFullNull;
    }
    if(validator.isNull(form[keys[7]]) &&  lastFilled >= 7) {
      errors.text = messages.graduate.save.textNull;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  },

  graduateSave: function(form) {
    var errors = {};
    if(validator.isNull(form.fullName)) {
      errors.fullName = messages.graduate.save.fullNameNull;
    }
    if(validator.isNull(form.img)) {
      errors.img = messages.graduate.save.imgNull;
    }
    if(validator.isNull(form.occupancy)) {
      errors.occupancy = messages.graduate.save.occupancyNull;
    }
    if(validator.isNull(form.lead)) {
      errors.lead = messages.graduate.save.leadNull;
    }
    if(validator.isNull(form.leadFull)) {
      errors.leadFull = messages.graduate.save.leadFullNull;
    }
    if(validator.isNull(form.text)) {
      errors.text = messages.graduate.save.textNull;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};
