/**
 * Admin routes
 */
var express = require('express');
var router = express.Router();

// Controllers
var adminRestricted = require('../controllers/admin/restricted');

// Routing
router.get('/', adminRestricted.index);
router.get('/add-graduate', adminRestricted.addGraduate);
router.get('/edit-graduate', adminRestricted.editGraduate);
router.get('/delete-graduate', adminRestricted.deleteGraduate);
router.get('/logout', adminRestricted.logout);
router.post('/verify-graduate.json', adminRestricted.verifyGraduate);
router.post('/save-graduate.json', adminRestricted.saveGraduate);

// Release
module.exports = router;
