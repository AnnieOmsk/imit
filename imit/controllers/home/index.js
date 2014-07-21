/**
 * Home controllers
 */
var service = require('../../services/main');

module.exports = {

  home: function (req, res) {
    res.redirect('/index.html');
  },

  index: function (req, res) {
    res.render('home/index', {});
  },

  contacts: function (req, res) {
    res.render('home/contacts', {});
  },

  goToUniversity: function (req, res) {
    res.render('home/go-to-university', {});
  },

  graduates: function (req, res) {
    var promise = service.findGraduates();
    promise.then(function(graduates) {
      res.render('home/graduates', {graduates: graduates});
    }, function(err) {
      res.render('home/graduates', {errors: {error: messages.restricted.graduates.errorDatabase}});
    });
  },

  interesting: function (req, res) {
    res.render('home/interesting', {});
  }
};
