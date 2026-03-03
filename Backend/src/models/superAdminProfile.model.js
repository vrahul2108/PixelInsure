const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const SuperAdminProfile = sequelize.define("SuperAdminProfile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: "Super Admin",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
});

module.exports = SuperAdminProfile;
