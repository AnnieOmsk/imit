/**
 * All "Graduate" entity related controllers
 */
var service = require('../../../../services/graduate');
var validator = require('../../../../services/validators/graduate');
var settings = require('../../../../configuration/settings');
var message = require('../../../../services/utils/message');
var Graduate = require('../../../../models').Graduate;
var sessionUtils = require('../../../utils/session');

module.exports = {

  addGraduate: function(req, res) {
    res.render('admin/restricted/add-graduate', {});
  },

  editGraduate: function(req, res) {
    var promise = service.findGraduate(req.query.id);
    promise.then(function(graduate) {
      res.render('admin/restricted/edit-graduate', {graduate: graduate});
    }, function (err) {
      res.render('admin/restricted/edit-graduate', {
        errors:{error: message.msg('validation.restricted.graduates.errorDatabase', req.session.locale)},
        graduate: new Graduate()
      });
    });
  },

  deleteGraduate: function(req, res) {
    var promise = service.deleteGraduate(req.query.id);
    var locale = req.session.locale;
    promise.then(function(result) {
      sessionUtils.setMessage({
        success: message.msg('validation.restricted.graduate.delete.success', locale, req.query.id)
      }, req);
      res.redirect('/admin/restricted/');
    }, function (err) {
      sessionUtils.setMessage({
        error: message.msg('validation.restricted.graduate.delete.error', locale, req.query.id)
      }, req);
      res.redirect('/admin/restricted/');
    });
  },

  verifyGraduate: function(req, res) {
    var form = req.body;
    var locale = req.session.locale;
    var errors = validator.graduateLive(form, locale);
    if (errors != null) {
      res.json({
        errorMessage: message.msg('validation.restricted.graduate.save.errorErrors', locale),
        errors: errors
      });
    } else {
      res.json({
        successMessage: ""
      });
    }
  },

  saveGraduate: function(req, res) {
    var form = req.body;
    var locale = req.session.locale;
    var errors = validator.graduateSave(form, locale);
    if (errors != null) {
      res.json({
        errorMessage: message.msg('validation.restricted.graduate.save.errorErrors', locale),
        errors: errors
      });
    } else {
      var graduate = new Graduate();
      graduate.fullName = form.fullName;
      if (form.img === "") {
        graduate.img = form.imgOld;
      } else {
        graduate.img = service.imageStore(form.img);
      }
      graduate.id = form.id;
      graduate.occupancy = form.occupancy;
      graduate.department = form.department;
      graduate.graduatedIn = form.graduatedIn;
      graduate.lead = form.lead;
      graduate.fullLead = form.fullLead;
      graduate.text = form.text;
      var promise = service.saveGraduate(graduate);
      promise.then(function(){
        var redirectUrl = settings.SITE_ADDRESS + "/admin/restricted/";
        var successMessage = message.msg('validation.restricted.graduate.save.success', locale);
        sessionUtils.setMessage({success: successMessage}, req);
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        errorMessage = message.msg('validation.restricted.graduate.save.errorDatabase', locale);
        res.json({
          errorMessage: errorMessage,
          errors: errors
        });
      });
    }
  }
};