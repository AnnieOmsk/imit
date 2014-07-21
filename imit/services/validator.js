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
    var keys = ['fullName', 'img', 'imgOld', 'occupancy', 'department', 'graduatedIn', 'lead', 'fullLead', 'text'];
    var lastFilled = keys.indexOf(fieldOut);

    if(validator.isNull(form[keys[0]]) && lastFilled >= 0) {
      errors.fullName = messages.restricted.graduate.save.fullNameNull;
      return errors;
    }
    if(validator.isNull(form[keys[1]]) &&  lastFilled >= 1 && validator.isNull(form[keys[2]])) {
      errors.img = messages.restricted.graduate.save.imgNull;
      return errors;
    }
    if(validator.isNull(form[keys[3]]) &&  lastFilled >= 3) {
      errors.occupancy = messages.restricted.graduate.save.occupancyNull;
      return errors;
    }
    if(validator.isNull(form[keys[6]]) &&  lastFilled >= 6) {
      errors.lead = messages.restricted.graduate.save.leadNull;
      return errors;
    }
    if(validator.isNull(form[keys[7]]) &&  lastFilled >= 7) {
      errors.fullLead = messages.restricted.graduate.save.fullLeadNull;
      return errors;
    }
    if(validator.isNull(form[keys[8]]) &&  lastFilled >= 8) {
      errors.text = messages.restricted.graduate.save.textNull;
      return errors;
    }
    return null;
  },

  graduateSave: function(form) {
    var errors = {};
    if(validator.isNull(form.fullName)) {
      errors.fullName = messages.restricted.graduate.save.fullNameNull;
    }
    if(validator.isNull(form.imgOld)) {
      if(validator.isNull(form.img)) {
        errors.img = messages.restricted.graduate.save.imgNull;
      } else if(form.img.type !== 'image/jpeg' && form.img.type !== 'image/png') {
        errors.img = messages.restricted.graduate.save.imgWrongType;
      }
    }
    if(validator.isNull(form.occupancy)) {
      errors.occupancy = messages.restricted.graduate.save.occupancyNull;
    }
    if(validator.isNull(form.lead)) {
      errors.lead = messages.restricted.graduate.save.leadNull;
    }
    if(validator.isNull(form.fullLead)) {
      errors.fullLead = messages.restricted.graduate.save.fullLeadNull;
    }
    if(validator.isNull(form.text)) {
      errors.text = messages.restricted.graduate.save.textNull;
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};
