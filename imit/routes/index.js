/**
 * Main routes
 */
var express = require('express');
var router = express.Router();

// Controller
var home = require('../controllers/Home');

// Routing
router.get('/', home.home);
router.get('/index.html', home.index);
router.get('/contacts.html', home.contacts);
router.get('/go_to_university.html', home.goToUniversity);
router.get('/graduates.html', home.graduates);
router.get('/interesting.html', home.interesting);

//Release
module.exports = router;
