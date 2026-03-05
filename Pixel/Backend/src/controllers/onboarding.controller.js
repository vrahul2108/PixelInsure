
const User = require("../models/user.model");
const UserProfile = require("../models/userProfile.model");
const FamilyProfile = require("../models/familyProfile.model");
const HealthProfile = require("../models/healthProfile.model");
const CoverageProfile = require("../models/coverageProfile.model");
const FinancialProfile = require("../models/financialProfile.model");
const PolicyProfile = require("../models/policyProfile.model");
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch ALL saved profile data so frontend can pre-fill
    const profile = await UserProfile.findOne({ where: { userId: user.id } });
    const family = await FamilyProfile.findOne({ where: { userId: user.id } });
    const health = await HealthProfile.findOne({ where: { userId: user.id } });
    const coverage = await CoverageProfile.findOne({ where: { userId: user.id } });
    const financial = await FinancialProfile.findOne({ where: { userId: user.id } });
    const policy = await PolicyProfile.findOne({ where: { userId: user.id } });

    res.json({
      step: user.onboardingStep || 0,
      onboardingCompleted: profile?.onboardingCompleted || false,
      savedData: {
        // Step 0 - Basic Info
        name: profile?.name || "",
        gender: profile?.gender || null,
        age: profile?.age || null,
        maritalStatus: profile?.maritalStatus || null,
        dependents: profile?.dependents || null,
        annualIncome: profile?.annualIncome || "",
        employmentType: profile?.employmentType || "",
        educationLevel: profile?.educationLevel || null,
        persona: profile?.persona || null,
        city: profile?.city || "",
        cityTier: profile?.cityTier || null,

        // Step 1 - Family
        spouseAge: family?.spouseAge || null,
        childrenAges: family?.childrenAges || [],
        parentsAges: family?.parentsAges || [],
        parentsFinanciallyDependent: family?.parentsFinanciallyDependent || null,
        childrenPlannedIn3To5Years: family?.childrenPlannedIn3To5Years || null,

        // Step 2 - Health
        existingDiseases: health?.existingDiseases || [],
        hospitalizationLast3Years: health?.hospitalizationLast3Years || null,
        smoking: health?.smoking || null,
        alcohol: health?.alcohol || null,
        height: health?.height || null,
        weight: health?.weight || null,
        bmi: health?.bmi || null,
        physicalActivityLevel: health?.physicalActivityLevel || null,
        familyMedicalHistory: health?.familyMedicalHistory || null,

        // Step 3 - Coverage
        coverageAmount: coverage?.coverageAmount || "",
        roomRent: coverage?.roomRent || null,
        restoreBenefit: coverage?.restoreBenefit || null,
        daycare: coverage?.daycare || false,
        opd: coverage?.opd || false,
        maternity: coverage?.maternity || false,
        criticalIllness: coverage?.criticalIllness || false,
        cashlessPreferred: coverage?.cashlessPreferred || null,
        shortWaitingPeriod: coverage?.shortWaitingPeriod || null,
        premiumVsCoverage: coverage?.premiumVsCoverage || 50,

        // Step 4 - Financial
        budgetRange: financial?.budgetRange || "",
        willingToIncrease: financial?.willingToIncrease || null,
        paymentFrequency: financial?.paymentFrequency || null,
        riskAppetite: financial?.riskAppetite || null,
        selectedGoals: financial?.selectedGoals || [],
        monthlyHouseholdExpense: financial?.monthlyHouseholdExpense || "",
        existingSavings: financial?.existingSavings || "",
        existingLifeCover: financial?.existingLifeCover || "",
        homeLoanOutstanding: financial?.homeLoanOutstanding || "",
        personalBusinessLoan: financial?.personalBusinessLoan || "",
        totalEMI: financial?.totalEMI || "",
        retirementAge: financial?.retirementAge || null,

        // Step 5 - Policy
        recommendedPolicyType: policy?.recommendedPolicyType || null,
        selectedPolicyType: policy?.selectedPolicyType || null,
        waiverOfPremium: policy?.waiverOfPremium || false,
        criticalIllnessRider: policy?.criticalIllnessRider || false,
        accidentalRider: policy?.accidentalRider || false,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
