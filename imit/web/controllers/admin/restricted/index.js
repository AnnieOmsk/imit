/**
 * Admin restricted zone controllers
 */
var service = require('../../../../services/graduate');
var settings = require('../../../../configuration/settings');
var messages = require('../../../../messages/validation');
var sessionUtils = require('../../../utils/session');

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
    req.logout();
    res.redirect('/admin/login');
  }
};