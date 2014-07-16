/**
 * Admin restricted zone controllers
 */
var service = require('../../services/admin');
var validator = require('../../services/validator');
var messages = require('../../messages/validation');

module.exports = {

  index: function(req, res) {
    var promise = service.findGraduates();
    promise.then(function(graduates) {
      res.render('admin/restricted/dashboard', {graduates: graduates});
    }, function(err) {
      res.render('admin/restricted/dashboard', {
        errors: {error: messages.restricted.graduates.errorDatabase},
        graduates: null
      });
    });
  },

  logout: function(req, res) {
    req.session.authenticated = false;
    req.session.user = null;
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
    return null;
  }
};