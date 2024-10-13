const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const News = sequelize.define('News', {
    newstitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    video: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'news',
    timestamps: true 
});

module.exports = News;
