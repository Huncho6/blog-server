// newsModel.js
'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

  return News;
};
