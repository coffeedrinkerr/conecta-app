const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');

router.get('/dashboard', professionalController.dashboard);

router.get('/update-profile', professionalController.updateProfileForm);
router.post('/update-profile', professionalController.updateProfile);

router.get('/contact-support', professionalController.contactSupportForm);
router.post('/contact-support', professionalController.contactSupport);

module.exports = router;
