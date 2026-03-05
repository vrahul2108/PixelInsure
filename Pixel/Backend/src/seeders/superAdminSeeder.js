const User = require("../models/user.model");
const SuperAdminProfile = require("../models/superAdminProfile.model");

const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: { role: "SUPER_ADMIN" },
    });

    if (existingAdmin) {
      // Ensure SuperAdminProfile exists
      const profile = await SuperAdminProfile.findOne({
        where: { userId: existingAdmin.id },
      });
      if (!profile) {
        await SuperAdminProfile.create({
          userId: existingAdmin.id,
          name: "Super Admin",
          email: process.env.SUPER_ADMIN_EMAIL || null,
          status: "active",
        });
        console.log("Super Admin profile created for existing user");
      }
      console.log("Super Admin already exists");
      return;
    }

    const superAdmin = await User.create({
      phone: process.env.SUPER_ADMIN_PHONE,
      role: "SUPER_ADMIN",
      isVerified: true,
    });

    await SuperAdminProfile.create({
      userId: superAdmin.id,
      name: "Super Admin",
      email: process.env.SUPER_ADMIN_EMAIL || null,
      status: "active",
    });

    console.log("Super Admin created successfully with profile");
  } catch (error) {
    console.log("Seeder error:", error.message);
  }
};

module.exports = seedSuperAdmin;
