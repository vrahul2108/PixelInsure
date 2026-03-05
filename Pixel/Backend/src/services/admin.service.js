const User = require("../models/user.model");
const AdminProfile = require("../models/adminProfile.model");
const UserProfile = require("../models/userProfile.model");
const FamilyProfile = require("../models/familyProfile.model");
const HealthProfile = require("../models/healthProfile.model");
const CoverageProfile = require("../models/coverageProfile.model");
const FinancialProfile = require("../models/financialProfile.model");
const PolicyProfile = require("../models/policyProfile.model");

exports.getAssignedCustomers = async (adminId) => {
  const profile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!profile) {
    throw new Error("Admin profile not found");
  }

  const customerIds = profile.assignedCustomers || [];

  if (customerIds.length === 0) {
    return [];
  }

  const { Op } = require("sequelize");
  const customers = await User.findAll({
    where: {
      id: { [Op.in]: customerIds },
      role: "CUSTOMER",
    },
    include: [
      {
        model: UserProfile,
        as: "profile",
      },
    ],
  });

  return customers;
};

exports.getCustomerFullProfile = async (customerId) => {
  const user = await User.findOne({
    where: { id: customerId, role: "CUSTOMER" },
  });

  if (!user) {
    throw new Error("Customer not found");
  }

  const profile = await UserProfile.findOne({ where: { userId: customerId } });
  const family = await FamilyProfile.findOne({ where: { userId: customerId } });
  const health = await HealthProfile.findOne({ where: { userId: customerId } });
  const coverage = await CoverageProfile.findOne({ where: { userId: customerId } });
  const financial = await FinancialProfile.findOne({ where: { userId: customerId } });
  const policy = await PolicyProfile.findOne({ where: { userId: customerId } });

  return {
    user: {
      id: user.id,
      phone: user.phone,
      onboardingStep: user.onboardingStep,
    },
    profile: profile?.dataValues || null,
    family: family?.dataValues || null,
    health: health?.dataValues || null,
    coverage: coverage?.dataValues || null,
    financial: financial?.dataValues || null,
    policy: policy?.dataValues || null,
  };
};

exports.createCustomer = async (adminId, phone) => {
  // Check admin has permission
  const adminProfile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!adminProfile) {
    throw new Error("Admin profile not found");
  }

  // Check if phone already exists
  const existingUser = await User.findOne({ where: { phone } });
  if (existingUser) {
    throw new Error("A user with this phone number already exists");
  }

  // Create customer
  const customer = await User.create({
    phone,
    role: "CUSTOMER",
    isVerified: true,
  });

  // Add customer to admin's assigned customers
  const assignedCustomers = adminProfile.assignedCustomers || [];
  assignedCustomers.push(customer.id);
  await adminProfile.update({ assignedCustomers });

  return {
    id: customer.id,
    phone: customer.phone,
    role: customer.role,
  };
};

exports.getDashboardData = async (adminId) => {
  const profile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!profile) {
    throw new Error("Admin profile not found");
  }

  const customerIds = profile.assignedCustomers || [];
  const totalCustomers = customerIds.length;

  return {
    profile,
    totalCustomers,
    permissions: {
      canCreateCustomer: profile.canCreateCustomer,
      canEditCustomer: profile.canEditCustomer,
      canDeleteCustomer: profile.canDeleteCustomer,
      canViewReports: profile.canViewReports,
      canManageOnboarding: profile.canManageOnboarding,
    },
  };
};
