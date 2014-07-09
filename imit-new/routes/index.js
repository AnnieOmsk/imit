/**
 * Main routes
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/index.html');
});

router.get('/index.html', function(req, res) {
  res.render('home/index', { title: 'IMIT Index' });
});

router.get('/contacts.html', function(req, res) {
  res.render('home/contacts', { title: 'IMIT Contacts' });
});

router.get('/go_to_university.html', function(req, res) {
  res.render('home/go_to_university', { title: 'IMIT Go to university' });
});

router.get('/graduates.html', function(req, res) {
  res.render('home/graduates', { title: 'IMIT Graduates' });
});

router.get('/interesting.html', function(req, res) {
  res.render('home/interesting', { title: 'IMIT Interesting' });
});

module.exports = router;
