const AdminProfile = require("../models/adminProfile.model");

module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      const adminProfile = await AdminProfile.findOne({
        where: { userId: req.user.id },
      });

      if (!adminProfile) {
        return res.status(403).json({
          message: "Admin profile not found",
        });
      }

      if (adminProfile.status !== "active") {
        return res.status(403).json({
          message: "Admin account is not active",
        });
      }

      if (!adminProfile[permission]) {
        return res.status(403).json({
          message: `Permission denied: ${permission} is not enabled for this admin`,
        });
      }

      // Attach admin profile to request for downstream use
      req.adminProfile = adminProfile;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Permission check failed",
      });
    }
  };
};
