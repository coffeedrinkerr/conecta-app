const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Support = sequelize.define('Support', {
    support_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    subject: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('abierto', 'cerrado', 'en_progreso'), defaultValue: 'abierto' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    timestamps: false,
    tableName: 'soporte',
});

module.exports = Support;
