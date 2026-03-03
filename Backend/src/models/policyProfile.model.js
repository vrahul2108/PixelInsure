const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const PolicyProfile = sequelize.define("PolicyProfile", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  recommendedPolicyType: DataTypes.STRING,
  selectedPolicyType: DataTypes.STRING,

  waiverOfPremium: DataTypes.BOOLEAN,
  criticalIllnessRider: DataTypes.BOOLEAN,
  accidentalRider: DataTypes.BOOLEAN,
});

module.exports = PolicyProfile;