/**
 * Admin routes
 */
var express = require('express');
var router = express.Router();

// Controllers
var adminRestricted = require('../controllers/admin/restricted');
var graduateRestricted = require('../controllers/admin/restricted/graduate');

// Routing

// Restricted
router.get('/', adminRestricted.index);
router.get('/logout', adminRestricted.logout);

// For Graduates
router.get('/add-graduate', graduateRestricted.addGraduate);
router.get('/edit-graduate', graduateRestricted.editGraduate);
router.get('/delete-graduate', graduateRestricted.deleteGraduate);
router.post('/verify-graduate.json', graduateRestricted.verifyGraduate);
router.post('/save-graduate.json', graduateRestricted.saveGraduate);

// Release
module.exports = router;
