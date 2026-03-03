const sequelize = require("../db/config/database");
const User = require("../models/user.model");
const AdminProfile = require("../models/adminProfile.model");

exports.createAdmin = async (phone, profileData, createdBy) => {
  const transaction = await sequelize.transaction();

  try {
    // Check if phone already exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      throw new Error("A user with this phone number already exists");
    }

    // Create user with ADMIN role
    const user = await User.create(
      {
        phone,
        role: "ADMIN",
        isVerified: true,
      },
      { transaction }
    );

    // Create admin profile
    const adminProfile = await AdminProfile.create(
      {
        userId: user.id,
        name: profileData.name,
        email: profileData.email || null,
        status: "active",
        canCreateCustomer: profileData.canCreateCustomer || false,
        canEditCustomer: profileData.canEditCustomer || false,
        canDeleteCustomer: profileData.canDeleteCustomer || false,
        canViewReports: profileData.canViewReports || false,
        canManageOnboarding: profileData.canManageOnboarding || false,
        assignedCustomers: [],
        createdBy,
      },
      { transaction }
    );

    await transaction.commit();

    return {
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      profile: adminProfile,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.getAllAdmins = async () => {
  const admins = await User.findAll({
    where: { role: "ADMIN" },
    include: [
      {
        model: AdminProfile,
        as: "adminProfile",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return admins;
};

exports.getAdminById = async (adminId) => {
  const admin = await User.findOne({
    where: { id: adminId, role: "ADMIN" },
    include: [
      {
        model: AdminProfile,
        as: "adminProfile",
      },
    ],
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  return admin;
};

exports.updateAdmin = async (adminId, data) => {
  const admin = await User.findOne({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  const profile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!profile) {
    throw new Error("Admin profile not found");
  }

  await profile.update({
    name: data.name !== undefined ? data.name : profile.name,
    email: data.email !== undefined ? data.email : profile.email,
    status: data.status !== undefined ? data.status : profile.status,
    canCreateCustomer:
      data.canCreateCustomer !== undefined
        ? data.canCreateCustomer
        : profile.canCreateCustomer,
    canEditCustomer:
      data.canEditCustomer !== undefined
        ? data.canEditCustomer
        : profile.canEditCustomer,
    canDeleteCustomer:
      data.canDeleteCustomer !== undefined
        ? data.canDeleteCustomer
        : profile.canDeleteCustomer,
    canViewReports:
      data.canViewReports !== undefined
        ? data.canViewReports
        : profile.canViewReports,
    canManageOnboarding:
      data.canManageOnboarding !== undefined
        ? data.canManageOnboarding
        : profile.canManageOnboarding,
  });

  return profile;
};

exports.deactivateAdmin = async (adminId) => {
  const profile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!profile) {
    throw new Error("Admin profile not found");
  }

  await profile.update({ status: "inactive" });

  return { message: "Admin deactivated successfully" };
};

exports.updatePermissions = async (adminId, permissions) => {
  const profile = await AdminProfile.findOne({
    where: { userId: adminId },
  });

  if (!profile) {
    throw new Error("Admin profile not found");
  }

  const allowedPermissions = [
    "canCreateCustomer",
    "canEditCustomer",
    "canDeleteCustomer",
    "canViewReports",
    "canManageOnboarding",
  ];

  const updateData = {};
  for (const key of allowedPermissions) {
    if (permissions[key] !== undefined) {
      updateData[key] = permissions[key];
    }
  }

  await profile.update(updateData);

  return profile;
};
