const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const FinancialProfile = sequelize.define("FinancialProfile", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  budgetRange: DataTypes.STRING,
  willingToIncrease: DataTypes.BOOLEAN,
  paymentFrequency: DataTypes.STRING,
  riskAppetite: DataTypes.STRING,
  selectedGoals: DataTypes.JSON,

  monthlyHouseholdExpense: DataTypes.STRING,
  existingSavings: DataTypes.STRING,
  existingLifeCover: DataTypes.STRING,

  homeLoanOutstanding: DataTypes.STRING,
  personalBusinessLoan: DataTypes.STRING,
  totalEMI: DataTypes.STRING,

  retirementAge: DataTypes.INTEGER,
});

module.exports = FinancialProfile;