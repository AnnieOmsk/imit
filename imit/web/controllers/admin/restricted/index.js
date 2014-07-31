/**
 * Admin restricted zone controllers
 */
var service = require('../../../../services/graduate');
var settings = require('../../../../configuration/settings');
var message = require('../../../../services/utils/message');
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
        errors: {error: message.msg('validation.restricted.graduates.errorDatabase', req.session.locale)},
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