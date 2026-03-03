const User = require("../models/user.model");

const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      where: { role: "SUPER_ADMIN" },
    });

    if (existingAdmin) {
      console.log("Super Admin already exists");
      return;
    }

    await User.create({
      phone: process.env.SUPER_ADMIN_PHONE,
      role: "SUPER_ADMIN",
      isVerified: true,
    });

    console.log("Super Admin created successfully");
  } catch (error) {
    console.log("Seeder error:", error.message);
  }
};

module.exports = seedSuperAdmin;