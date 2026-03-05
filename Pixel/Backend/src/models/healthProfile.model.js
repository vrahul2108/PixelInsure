const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const HealthProfile = sequelize.define("HealthProfile", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  existingDiseases: DataTypes.JSON,
  hospitalizationLast3Years: DataTypes.BOOLEAN,
  smoking: DataTypes.BOOLEAN,
  alcohol: DataTypes.STRING,
  height: DataTypes.INTEGER,
  weight: DataTypes.INTEGER,
  bmi: DataTypes.FLOAT,
  physicalActivityLevel: DataTypes.STRING,
  familyMedicalHistory: DataTypes.BOOLEAN,
});

module.exports = HealthProfile;

