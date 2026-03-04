const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const UserProfile = sequelize.define("UserProfile", {
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

  name: DataTypes.STRING,
  gender: DataTypes.STRING,
  age: DataTypes.INTEGER,
  maritalStatus: DataTypes.STRING,
  dependents: DataTypes.INTEGER,
  annualIncome: DataTypes.STRING,
  employmentType: DataTypes.STRING,
  educationLevel: DataTypes.STRING,
  persona: DataTypes.STRING,

  city: DataTypes.STRING,
  cityTier: DataTypes.STRING,

  onboardingCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserProfile;