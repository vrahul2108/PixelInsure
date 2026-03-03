require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8000,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  OTP_EXPIRY: 300
};