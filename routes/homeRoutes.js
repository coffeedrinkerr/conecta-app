const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, (req, res) => {
    res.render('home');
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.send('Perfil');
});

router.get('/inscription', isAuthenticated, (req, res) => {
    res.send('Inscripción');
});

router.get('/rate', isAuthenticated, (req, res) => {
    res.send('Calificación');
});

router.get('/services', isAuthenticated, (req, res) => {
    res.send('Servicios');
});

router.get('/rating', isAuthenticated, (req, res) => {
    res.send('Puntuación');
});

router.get('/requests', isAuthenticated, (req, res) => {
    res.send('Solicitudes');
});

module.exports = router;
