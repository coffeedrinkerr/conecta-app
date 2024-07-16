const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de sesión
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Configuración de body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/homeRoutes'));
app.use('/client', require('./routes/clientRoutes'));
app.use('/professional', require('./routes/professionalRoutes'));

// Sincronizar base de datos y arrancar servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
