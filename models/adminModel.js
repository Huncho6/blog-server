const { DataTypes, Sequelize } = require("sequelize"); // Import Sequelize as well
const sequelize = require("../db");

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
    type: DataTypes.STRING, // Use DataTypes instead of Sequelize
    allowNull: true,
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Admin;
