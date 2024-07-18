const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

const sessionStore = new SequelizeStore({
    db: sequelize,
});

app.use(session({
    secret: 'secret_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', require('./routes/authRoutes'));
app.use('/', require('./routes/homeRoutes'));
app.use('/client', require('./routes/clientRoutes'));
app.use('/professional', require('./routes/professionalRoutes'));
app.use('/profile', require('./routes/profileRoutes'));

sessionStore.sync().then(() => {
    return sequelize.sync();
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
