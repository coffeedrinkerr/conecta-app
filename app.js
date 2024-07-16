const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de sesión con Sequelize
const sessionStore = new SequelizeStore({
    db: sequelize,
});

app.use(session({
    secret: 'secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Debe ser true si usas HTTPS
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
app.use('/profile', require('./routes/profileRoutes'));

// Sincronizar base de datos y arrancar servidor
sessionStore.sync().then(() => {
    return sequelize.sync();
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
