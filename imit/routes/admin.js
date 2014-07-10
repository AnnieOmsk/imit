/**
 * Admin routes
 */
var express = require('express');
var router = express.Router();

// Controllers
var adminLogin = require('../controllers/AdminLogin');
var adminRegister = require('../controllers/AdminRegister');

// Routing
router.get('/', adminLogin.home);
router.get('/login', adminLogin.login);
router.post('/login.json', adminLogin.postJson);
router.get('/register', adminRegister.register);
router.post('/register.json', adminRegister.postJson);

// Release
module.exports = router;
