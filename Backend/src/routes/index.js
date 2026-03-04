const express = require("express");
const authRoutes = require("./auth.routes");
const onboardingRoutes = require("./onboarding.routes");
const profileRoutes = require("./profile.routes");
const adminRoutes = require("./admin.routes");
const superAdminRoutes = require("./superAdmin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/onboarding", onboardingRoutes);
router.use("/profile", profileRoutes);
router.use("/admin", adminRoutes);
router.use("/superadmin", superAdminRoutes);

module.exports = router;
