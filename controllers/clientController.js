const User = require('../models/User');
const Support = require('../models/Support');

exports.dashboard = (req, res) => {
    res.render('clientDashboard', { user: req.session.user });
};

exports.updateProfileForm = (req, res) => {
    res.render('updateClientProfile', { user: req.session.user });
};

exports.updateProfile = async (req, res) => {
    const { name, email, phone, address, password } = req.body;
    await User.update({ name, email, phone, address, password }, { where: { user_id: req.session.user.user_id } });
    res.redirect('/client/dashboard');
};

exports.contactSupportForm = (req, res) => {
    res.render('contactSupport', { user: req.session.user });
};

exports.contactSupport = async (req, res) => {
    const { subject, description } = req.body;
    await Support.create({ user_id: req.session.user.user_id, subject, description, status: 'abierto' });
    res.redirect('/client/dashboard');
};
