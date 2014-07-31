/**
 * Home controllers
 */
var service = require('../../../services/main');
var q = require('q');
var INDEX_NUMBER_GRADUATES = 3;
var message = require('../../../services/utils/message');

module.exports = {

  home: function (req, res) {
    res.redirect('/index.html');
  },

  index: function (req, res) {
    var promises = q.all([service.findGraduates(INDEX_NUMBER_GRADUATES),
      service.findGraduates(INDEX_NUMBER_GRADUATES, true)]);
    promises.then(function(data) {
      res.render('home/index', {
        graduatesTop: data[0],
        graduatesBottom: data[1]
      });
    }, function(err) {
      res.render('home/index', {errors: {
        error: message.msg('validation.restricted.graduates.errorDatabase', req.session.locale)
      }});
    });
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
      res.render('home/graduates', {errors: {
        error: message.msg('validation.restricted.graduates.errorDatabase', req.session.locale)
      }});
    });
  },

  interesting: function (req, res) {
    res.render('home/interesting', {});
  }
};
