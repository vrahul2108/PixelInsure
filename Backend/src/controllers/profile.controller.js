const profileService = require("../services/profile.service");

exports.createUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await profileService.createUserProfile(
      userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFullProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await profileService.getFullProfile(userId);

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};