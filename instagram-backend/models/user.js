const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    mobileNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    address: { type: DataTypes.STRING },
    postCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = User;
