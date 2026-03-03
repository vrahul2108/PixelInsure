const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const RefreshToken = sequelize.define("RefreshToken", {
  token: DataTypes.TEXT,
  userId: DataTypes.UUID,
});

module.exports = RefreshToken;