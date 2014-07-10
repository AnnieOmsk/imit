/**
 * Admin routes
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/admin/login');
});

router.get('/login', function(req, res) {
  res.render('admin/login', {});
});

router.post('/login', function(req, res) {
  var errors = {};
  errors.password = "Incorrect password";
  res.render('admin/login', {
    errors: errors
  });
});

module.exports = router;
