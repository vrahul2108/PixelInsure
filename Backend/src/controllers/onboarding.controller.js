
const User = require("../models/user.model")
const onboardingService = require("../services/onboarding.service");

exports.saveOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    const result = await onboardingService.saveOnboarding(userId, data);

    res.status(200).json(result);
  } catch (error) {
    console.error("Onboarding Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getOnboardingProgress = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.json({
      step: user.onboardingStep || 0,
      onboardingCompleted: user.onboardingCompleted || false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};