const User = require("./user.model");
const UserProfile = require("./userProfile.model");
const FamilyProfile = require("./familyProfile.model");
const HealthProfile = require("./healthProfile.model");
const CoverageProfile = require("./coverageProfile.model");
const FinancialProfile = require("./financialProfile.model");
const PolicyProfile = require("./policyProfile.model");

// User → Main Profile
User.hasOne(UserProfile, { foreignKey: "userId", as: "profile" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

// User → Sub Profiles
User.hasOne(FamilyProfile, { foreignKey: "userId", as: "family" });
FamilyProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(HealthProfile, { foreignKey: "userId", as: "health" });
HealthProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(CoverageProfile, { foreignKey: "userId", as: "coverage" });
CoverageProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(FinancialProfile, { foreignKey: "userId", as: "financial" });
FinancialProfile.belongsTo(User, { foreignKey: "userId" });

User.hasOne(PolicyProfile, { foreignKey: "userId", as: "policy" });
PolicyProfile.belongsTo(User, { foreignKey: "userId" });

module.exports = {};