const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'HaciFprZpEsOgVSTDlPHNAuWkcXhhiMG', {
    host: 'monorail.proxy.rlwy.net',
    port: 14016,
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
