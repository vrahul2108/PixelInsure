const superAdminService = require("../services/superAdmin.service");

exports.createAdmin = async (req, res) => {
  try {
    const { phone, name, email, permissions } = req.body;

    if (!phone || !name) {
      return res.status(400).json({
        message: "Phone and name are required",
      });
    }

    const result = await superAdminService.createAdmin(
      phone,
      {
        name,
        email,
        ...(permissions || {}),
      },
      req.user.id
    );

    res.status(201).json({
      message: "Admin created successfully",
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await superAdminService.getAllAdmins();

    res.json({ admins });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await superAdminService.getAdminById(req.params.id);

    res.json({ admin });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const profile = await superAdminService.updateAdmin(
      req.params.id,
      req.body
    );

    res.json({
      message: "Admin updated successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deactivateAdmin = async (req, res) => {
  try {
    const result = await superAdminService.deactivateAdmin(req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateAdminPermissions = async (req, res) => {
  try {
    const profile = await superAdminService.updatePermissions(
      req.params.id,
      req.body
    );

    res.json({
      message: "Permissions updated successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
