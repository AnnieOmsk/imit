/**
 * Admin restricted zone controllers
 */
var service = require('../../services/admin');
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
  }
};