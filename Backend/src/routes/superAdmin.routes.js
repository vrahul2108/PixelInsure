const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const superAdminController = require("../controllers/superAdmin.controller");

// All routes require SUPER_ADMIN role
router.use(authMiddleware, authorizeRoles("SUPER_ADMIN"));

// Dashboard
router.get("/dashboard", superAdminController.dashboard);

// CRUD for admins
router.post("/admins", superAdminController.createAdmin);
router.get("/admins", superAdminController.getAllAdmins);
router.get("/admins/:id", superAdminController.getAdminById);
router.put("/admins/:id", superAdminController.updateAdmin);
router.patch("/admins/:id/status", superAdminController.deactivateAdmin);
router.patch("/admins/:id/permissions", superAdminController.updateAdminPermissions);

module.exports = router;
