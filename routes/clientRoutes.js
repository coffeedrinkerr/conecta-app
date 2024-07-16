const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/dashboard', clientController.dashboard);

router.get('/update-profile', clientController.updateProfileForm);
router.post('/update-profile', clientController.updateProfile);

router.get('/contact-support', clientController.contactSupportForm);
router.post('/contact-support', clientController.contactSupport);

module.exports = router;
