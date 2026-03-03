const { DataTypes } = require("sequelize");
const sequelize = require("../db/config/database");

const AdminProfile = sequelize.define("AdminProfile", {
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
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "suspended"),
    defaultValue: "active",
  },
  canCreateCustomer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canEditCustomer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canDeleteCustomer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canViewReports: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canManageOnboarding: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  assignedCustomers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

module.exports = AdminProfile;
