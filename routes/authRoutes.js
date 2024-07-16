const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register/client', authController.registerClientForm);
router.post('/register/client', authController.registerClient);

router.get('/register/professional', authController.registerProfessionalForm);
router.post('/register/professional', authController.registerProfessional);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
});

module.exports = router;
