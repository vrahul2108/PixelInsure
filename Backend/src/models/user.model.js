const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.ENUM("SUPER_ADMIN", "ADMIN", "VENDOR", "CUSTOMER"),
    defaultValue: "CUSTOMER",
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  onboardingStep: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = User;