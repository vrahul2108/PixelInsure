// const express = require("express");
// const router = express.Router();
// const profileController = require("../controllers/profile.controller");

// const authMiddleware = require("../middlewares/auth.middleware");
// router.post("/create-profile", profileController.createUserProfile);
// router.get("/get-profile", authMiddleware, profileController.getFullProfile);

//  module.exports = router;

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");

router.post(
  "/create-profile",
  authMiddleware,
  authorizeRoles("CUSTOMER"),
  profileController.createUserProfile
);

router.get(
  "/get-profile",
  authMiddleware,
  authorizeRoles("CUSTOMER", "ADMIN", "SUPER_ADMIN"),
  profileController.getFullProfile
);

module.exports = router;