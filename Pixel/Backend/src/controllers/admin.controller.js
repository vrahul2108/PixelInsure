const adminService = require("../services/admin.service");

exports.dashboard = async (req, res) => {
  try {
    const data = await adminService.getDashboardData(req.user.id);

    res.json({
      message: "Welcome Admin",
      ...data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAssignedCustomers = async (req, res) => {
  try {
    const customers = await adminService.getAssignedCustomers(req.user.id);

    res.json({ customers });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCustomerProfile = async (req, res) => {
  try {
    const profile = await adminService.getCustomerFullProfile(req.params.id);

    res.json(profile);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    const customer = await adminService.createCustomer(req.user.id, phone);

    res.status(201).json({
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
