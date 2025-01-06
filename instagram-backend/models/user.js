const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    mobileNumber: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false,
        validate: {
            is: /^[0-9]{10}$/ // This regex validates a 10-digit mobile number. Adjust as necessary.
        }
    },
    address: { 
        type: DataTypes.STRING, 
        allowNull: true  // Explicitly setting allowNull to true for clarity
    },
    postCount: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
}, {
    timestamps: true,  // Ensures createdAt and updatedAt are automatically added
});

module.exports = User;
