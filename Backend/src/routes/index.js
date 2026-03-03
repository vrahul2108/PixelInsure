const express = require("express");
const authRoutes = require("./auth.routes");
const onboardingRoutes = require("./onboarding.routes");
const profileRoutes = require("./profile.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/onboarding", onboardingRoutes);
router.use("/profile", profileRoutes);
router.use("/admin", adminRoutes);

module.exports = router;