const User = require("../models/user.model");
const UserProfile = require("../models/userProfile.model")
const OTP = require("../models/otp.model");
const { generateOTP } = require("../utils/otpGenerator");
const { generateAuthTokens } = require("./token.service");
const RefreshToken = require("../models/refreshToken.model");

exports.sendOTP = async (phone) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  const code = generateOTP();

  await OTP.destroy({ where: { phone } });

  await OTP.create({
    phone,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  return {
    message: "OTP sent successfully",
    code,
  };
};

exports.verifyOTP = async (phone, code) => {
  if (!phone || !code) {
    throw new Error("Phone and OTP code are required");
  }

  // Get latest OTP
  const otpRecord = await OTP.findOne({
    where: { phone },
    order: [["createdAt", "DESC"]],
  });

  if (!otpRecord) {
    throw new Error("OTP not found");
  }

  // Check match
  if (String(otpRecord.code) !== String(code)) {
    throw new Error("Invalid OTP");
  }

  // Check expiry
  if (otpRecord.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  // Find or create user
  let user = await User.findOne({ where: { phone } });

  if (!user) {
    user = await User.create({
      phone,
      isVerified: true,
    });
  } else {
    user.isVerified = true;
    await user.save();
  }

  // CHECK onboarding status here (after user exists)
  const profile = await UserProfile.findOne({
    where: { userId: user.id },
  });

  const onboardingCompleted = profile?.onboardingCompleted || false;

  // Delete OTP after success
  await OTP.destroy({ where: { phone } });

  // Remove old refresh tokens
  await RefreshToken.destroy({
    where: { userId: user.id },
  });

  const tokens = await generateAuthTokens(user);

  return {
    message: "OTP verified successfully",
    user,
    onboardingCompleted,
    ...tokens,
  };
};

exports.logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token required");
  }

  const token = await RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!token) {
    throw new Error("Invalid refresh token");
  }

  await token.destroy();

  return { message: "Logged out successfully" };
};