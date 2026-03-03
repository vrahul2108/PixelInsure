const express = require("express");
const router = express.Router();
const controller = require("../controllers/onboarding.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");


router.post(
  "/save",
  authMiddleware,
  authorizeRoles("CUSTOMER"),
  controller.saveOnboarding
);

router.get(
  "/progress",
  authMiddleware,
  controller.getOnboardingProgress
);
module.exports = router;