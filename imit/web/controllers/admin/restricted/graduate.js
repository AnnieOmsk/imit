/**
 * All "Graduate" entity related controllers
 */
var service = require('../../../../services/graduate');
var validator = require('../../../../services/validators/graduate');
var settings = require('../../../../configuration/settings');
var messages = require('../../../../messages/validation');
var Graduate = require('../../../../models/graduate');
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
        errors:{error:messages.restricted.graduates.errorDatabase},
        graduate: new Graduate()
      });
    });
  },

  deleteGraduate: function(req, res) {
    var promise = service.deleteGraduate(req.query.id);
    promise.then(function(result) {
      sessionUtils.setMessage({success: messages.restricted.graduate.delete.success1 + req.query.id +
        messages.restricted.graduate.delete.success2}, req);
      res.redirect('/admin/restricted/');
    }, function (err) {
      sessionUtils.setMessage({error: messages.restricted.graduate.delete.error1 + req.query.id +
        messages.restricted.graduate.delete.error2}, req);
      res.redirect('/admin/restricted/');
    });
  },

  verifyGraduate: function(req, res) {
    var form = req.body;
    var errors = validator.graduateLive(form);
    if (errors != null) {
      res.json({
        errorMessage: messages.restricted.graduate.save.errorErrors,
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
        errorMessage: messages.restricted.graduate.save.errorErrors,
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
        var successMessage = messages.restricted.graduate.save.success;
        sessionUtils.setMessage({success: successMessage}, req);
        res.json({
          successMessage: successMessage,
          redirectUrl: redirectUrl
        });
      }, function(err) {
        var errorMessage;
        errorMessage = messages.restricted.graduate.save.errorDatabase;
        res.json({
          errorMessage: errorMessage,
          errors: errors
        });
      });
    }
  }
};