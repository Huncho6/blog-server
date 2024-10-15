// newsModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Import the sequelize instance

const News = sequelize.define(
  "News",
  {
    newstitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "news",
    timestamps: true,
  }
);

module.exports = News;
