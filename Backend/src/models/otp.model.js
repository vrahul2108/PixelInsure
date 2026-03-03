const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const OTP = sequelize.define("OTP", {
  phone: DataTypes.STRING,
  code: DataTypes.STRING,
  expiresAt: DataTypes.DATE,
});

module.exports = OTP;