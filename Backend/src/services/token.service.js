const RefreshToken = require("../models/refreshToken.model");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

exports.generateAuthTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    token: refreshToken,
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
  };
};