/**
 * Admin restricted zone controllers
 */
var service = require('../../services/admin');
var validator = require('../../services/validator');
var settings = require('../../configuration/settings');
var messages = require('../../messages/validation');
var Graduate = require('../../models/graduate');
var sessionUtils = require('../utils/session');

module.exports = {

  index: function(req, res) {
    var promise = service.findGraduates();
    var message = sessionUtils.readMessage(req);
    promise.then(function(graduates) {
      res.render('admin/restricted/dashboard', {
        graduates: graduates,
        flashMessage: message
      });
    }, function(err) {
      res.render('admin/restricted/dashboard', {
        errors: {error: messages.restricted.graduates.errorDatabase},
        graduates: null,
        flashMessage: message
      });
    });
  },

  logout: function(req, res) {
    sessionUtils.userLogout(req);
    res.redirect('/admin/login');
  },

  verifyGraduate: function(req, res) {
    var form = req.body;
    var errors = validator.graduateLive(form);
    if (errors != null) {
      res.json({
        errorMessage: messages.graduate.save.errorErrors,
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
    var errors = validator.graduateSave(form);
    if (errors != null) {
      res.json({
        errorMessage: messages.graduate.save.errorErrors,
        errors: errors
      });
    } else {
      var graduate = new Graduate();
      graduate.fullName = form.fullName;
      graduate.img = service.imageStore(form.img);
      graduate.occupancy = form.occupancy;
      graduate.department = form.department;
      graduate.graduatedIn = form.graduatedIn;
      graduate.lead = form.lead;
      graduate.fullLead = form.fullLead;
      graduate.text = form.text;
      var promise = service.saveGraduate(graduate);
      promise.then(function(){
        var redirectUrl = settings.SITE_ADDRESS + "/admin/restricted/";
        var successMessage = messages.graduate.save.success;
        sessionUtils.addMessage({success: successMessage}, req);
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        errorMessage = messages.graduate.save.errorDatabase;
        res.json({
          errorMessage: errorMessage,
          errors: errors
        });
      });
    }
  }
};