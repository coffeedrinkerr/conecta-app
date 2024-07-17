const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.profileForm = async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        console.log('User data:', user); // Imprime el objeto user en la consola
        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el perfil del usuario.');
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email, phone, address, password } = req.body;
    const updates = { name, email, phone, address };

    if (password) {
        updates.password = await bcrypt.hash(password, 8);
    }

    try {
        await User.update(updates, { where: { user_id: req.session.userId } });
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el perfil del usuario.');
    }
};
