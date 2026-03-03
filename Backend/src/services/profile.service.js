const UserProfile = require("../models/userProfile.model");
const FamilyProfile = require("../models/familyProfile.model");
const HealthProfile = require("../models/healthProfile.model");
const CoverageProfile = require("../models/coverageProfile.model");
const FinancialProfile = require("../models/financialProfile.model");
const PolicyProfile = require("../models/policyProfile.model");


exports.createUserProfile = async (userId, data) => {
  // Prevent duplicate profile
  const existingProfile = await UserProfile.findOne({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Profile already exists");
  }

  const profile = await UserProfile.create({
    userId,
    ...data,
  });

  return profile;
};


exports.getFullProfile = async (userId) => {
  return await UserProfile.findOne({
    where: { userId },
    include: [
  { model: FamilyProfile, as: "family" },
  { model: HealthProfile, as: "health" },
  { model: CoverageProfile, as: "coverage" },
  { model: FinancialProfile, as: "financial" },
  { model: PolicyProfile, as: "policy" },
],
  });
};