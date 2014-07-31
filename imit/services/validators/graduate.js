/**
 * Graduates validator
 */
var validator = require('validator');
var message = require('../utils/message');

module.exports = {

  graduateLive: function(form, locale) {
    var errors = {};
    var fieldOut = form["_fieldout"];
    var keys = ['fullName', 'img', 'imgOld', 'occupancy', 'department', 'graduatedIn', 'lead', 'fullLead', 'text'];
    var lastFilled = keys.indexOf(fieldOut);

    if(validator.isNull(form[keys[0]]) && lastFilled >= 0) {
      errors.fullName = message.msg('validation.restricted.graduate.save.fullNameNull', locale);
      return errors;
    }
    if(validator.isNull(form[keys[1]]) &&  lastFilled >= 1 && validator.isNull(form[keys[2]])) {
      errors.img = message.msg('validation.restricted.graduate.save.imgNull', locale);
      return errors;
    }
    if(validator.isNull(form[keys[3]]) &&  lastFilled >= 3) {
      errors.occupancy = message.msg('validation.restricted.graduate.save.occupancyNull', locale);
      return errors;
    }
    if(validator.isNull(form[keys[6]]) &&  lastFilled >= 6) {
      errors.lead = message.msg('validation.restricted.graduate.save.leadNull', locale);
      return errors;
    }
    if(validator.isNull(form[keys[7]]) &&  lastFilled >= 7) {
      errors.fullLead = message.msg('validation.restricted.graduate.save.fullLeadNull', locale);
      return errors;
    }
    if(validator.isNull(form[keys[8]]) &&  lastFilled >= 8) {
      errors.text = message.msg('validation.restricted.graduate.save.textNull', locale);
      return errors;
    }
    return null;
  },

  graduateSave: function(form, locale) {
    var errors = {};
    if(validator.isNull(form.fullName)) {
      errors.fullName = message.msg('validation.restricted.graduate.save.fullNameNull', locale);
    }
    if(validator.isNull(form.imgOld)) {
      if(validator.isNull(form.img)) {
        errors.img = message.msg('validation.restricted.graduate.save.imgNull', locale);
      } else if(form.img.type !== 'image/jpeg' && form.img.type !== 'image/png') {
        errors.img = message.msg('validation.restricted.graduate.save.imgWrongType', locale);
      }
    }
    if(validator.isNull(form.occupancy)) {
      errors.occupancy = message.msg('validation.restricted.graduate.save.occupancyNull', locale);
    }
    if(validator.isNull(form.lead)) {
      errors.lead = message.msg('validation.restricted.graduate.save.leadNull', locale);
    }
    if(validator.isNull(form.fullLead)) {
      errors.fullLead = message.msg('validation.restricted.graduate.save.fullLeadNull', locale);
    }
    if(validator.isNull(form.text)) {
      errors.text = message.msg('validation.restricted.graduate.save.textNull', locale);
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    return null;
  }
};
