const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = require("../config/env");
const RefreshToken = require("../models/refreshToken.model");
const User = require("../models/user.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    const result = await authService.sendOTP(phone);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// exports.verifyOTP = async (phone, code) => {
//   if (!phone || !code) {
//     throw new Error("Phone and OTP code are required");
//   }

//   // Get latest OTP for this phone
//   const otpRecord = await OTP.findOne({
//     where: { phone },
//     order: [["createdAt", "DESC"]],
//   });

//   if (!otpRecord) {
//     throw new Error("OTP not found. Please request a new OTP.");
//   }

//   // Check OTP match
//   if (String(otpRecord.code) !== String(code)) {
//     throw new Error("Invalid OTP");
//   }

//   // Check expiry
//   if (new Date() > otpRecord.expiresAt) {
//     throw new Error("OTP expired");
//   }

//   let user = await User.findOne({ where: { phone } });

//   if (!user) {
//     user = await User.create({
//       phone,
//       isVerified: true,
//     });
//   } else {
//     user.isVerified = true;
//     await user.save();
//   }

//   // Delete OTP after success
//   await OTP.destroy({ where: { phone } });

//   const tokens = await generateAuthTokens(user);

//   return {
//     message: "OTP verified successfully",
//     user,
//     ...tokens,
//   };
// };


exports.verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;

    const result = await authService.verifyOTP(phone, code);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    // Check if token exists in DB
    const storedToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Get user
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ROTATION STARTS HERE

    // Delete old refresh token
    await storedToken.destroy();

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Save new refresh token
    await RefreshToken.create({
      token: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      message: "Refresh token expired",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const result = await authService.logout(refreshToken);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};