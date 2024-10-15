'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require("../db"); // Import the sequelize instance

const Admin = sequelize.define("Admin", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
  passwordResetToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: "admins", // Set table name to match your database
  timestamps: true, // Add timestamps for createdAt and updatedAt
});

module.exports = Admin;
