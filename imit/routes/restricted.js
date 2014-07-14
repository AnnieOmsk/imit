/**
 * Admin routes
 */
var express = require('express');
var router = express.Router();

// Controllers
var adminRestricted = require('../controllers/admin/restricted');

// Routing
router.get('/', adminRestricted.index);
router.get('/logout', adminRestricted.logout);

// Release
module.exports = router;
