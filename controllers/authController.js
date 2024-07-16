const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerClientForm = (req, res) => {
    res.render('registerClient');
};

exports.registerClient = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({ name, email, password: hashedPassword, phone, address, user_type: 'cliente' });
    res.redirect('/auth/login');
};

exports.registerProfessionalForm = (req, res) => {
    res.render('registerProfessional');
};

exports.registerProfessional = async (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    await User.create({ name, email, password: hashedPassword, phone, address, user_type: 'profesional' });
    res.redirect('/auth/login');
};

exports.loginForm = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.user_id;
        req.session.userType = user.user_type;
        req.session.user = user; // Almacena el usuario completo en la sesión
        res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }
};
