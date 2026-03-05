const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/role.middleware");
const checkPermission = require("../middlewares/permission.middleware");
const adminController = require("../controllers/admin.controller");

// All admin routes require ADMIN role
router.use(authMiddleware, authorizeRoles("ADMIN"));

// Dashboard
router.get("/dashboard", adminController.dashboard);

// Customer management
router.get("/customers", adminController.getAssignedCustomers);
router.get("/customers/:id", adminController.getCustomerProfile);
router.post(
  "/customers",
  checkPermission("canCreateCustomer"),
  adminController.createCustomer
);

module.exports = router;
