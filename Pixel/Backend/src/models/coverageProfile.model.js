const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const CoverageProfile = sequelize.define("CoverageProfile", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  coverageAmount: DataTypes.STRING,
  roomRent: DataTypes.STRING,
  restoreBenefit: DataTypes.BOOLEAN,
  daycare: DataTypes.BOOLEAN,
  opd: DataTypes.BOOLEAN,
  maternity: DataTypes.BOOLEAN,
  criticalIllness: DataTypes.BOOLEAN,
  cashlessPreferred: DataTypes.BOOLEAN,
  shortWaitingPeriod: DataTypes.BOOLEAN,
  premiumVsCoverage: DataTypes.INTEGER,
});

module.exports = CoverageProfile;