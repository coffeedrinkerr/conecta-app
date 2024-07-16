const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, profileController.profileForm);
router.post('/update', isAuthenticated, profileController.updateProfile);

module.exports = router;
