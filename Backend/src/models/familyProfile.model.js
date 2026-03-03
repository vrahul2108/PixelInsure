const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const FamilyProfile = sequelize.define("FamilyProfile", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  spouseAge: DataTypes.INTEGER,
  childrenAges: DataTypes.JSON,
  parentsAges: DataTypes.JSON,
  parentsFinanciallyDependent: DataTypes.BOOLEAN,
  childrenPlannedIn3To5Years: DataTypes.BOOLEAN,
});

module.exports = FamilyProfile;