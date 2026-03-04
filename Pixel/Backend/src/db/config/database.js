const { Sequelize } = require("sequelize");
const { DB_URL } = require("../../config/env");

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;