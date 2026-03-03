const sequelize = require("../db/config/database");
const User = require("../models/user.model")
const UserProfile = require("../models/userProfile.model");
const FamilyProfile = require("../models/familyProfile.model");
const HealthProfile = require("../models/healthProfile.model");
const CoverageProfile = require("../models/coverageProfile.model");
const FinancialProfile = require("../models/financialProfile.model");
const PolicyProfile = require("../models/policyProfile.model");

exports.saveOnboarding = async (userId, data) => {
  const transaction = await sequelize.transaction();

  try {
    const existingProfile = await UserProfile.findOne({
      where: { userId },
    });

    if (existingProfile && existingProfile.onboardingCompleted) {
      throw new Error("User already completed onboarding");
    }
    let bmi = null;
    if (data.height && data.weight) {
      const heightInMeters = data.height / 100;
      bmi = data.weight / (heightInMeters * heightInMeters);
      bmi = Number(bmi.toFixed(2));
    }

    if (data.step !== undefined) {
      await User.update(
        { onboardingStep: data.step },
        { where: { id: userId }, transaction }
      );
    }

    await UserProfile.upsert(
      {
        userId,
        name: data.name,
        gender: data.gender,
        age: data.age,
        maritalStatus: data.maritalStatus,
        dependents: data.dependents,
        annualIncome: data.annualIncome,
        employmentType: data.employmentType,
        educationLevel: data.educationLevel,
        persona: data.persona,
        city: data.city,
        cityTier: data.cityTier,
        // onboardingCompleted: true,
        onboardingCompleted: data.step === 6,
      },
      { transaction }
    );

    await FamilyProfile.upsert(
      {
        userId,
        spouseAge: data.spouseAge,
        childrenAges: data.childrenAges,
        parentsAges: data.parentsAges,
        parentsFinanciallyDependent: data.parentsFinanciallyDependent,
        childrenPlannedIn3To5Years: data.childrenPlannedIn3To5Years,
      },
      { transaction }
    );

    await HealthProfile.upsert(
      {
        userId,
        existingDiseases: data.existingDiseases,
        hospitalizationLast3Years: data.hospitalizationLast3Years,
        smoking: data.smoking,
        alcohol: data.alcohol,
        height: data.height,
        weight: data.weight,
        bmi,
        physicalActivityLevel: data.physicalActivityLevel,
        familyMedicalHistory: data.familyMedicalHistory,
      },
      { transaction }
    );

    await CoverageProfile.upsert(
      {
        userId,
        coverageAmount: data.coverageAmount,
        roomRent: data.roomRent,
        restoreBenefit: data.restoreBenefit,
        daycare: data.daycare,
        opd: data.opd,
        maternity: data.maternity,
        criticalIllness: data.criticalIllness,
        cashlessPreferred: data.cashlessPreferred,
        shortWaitingPeriod: data.shortWaitingPeriod,
        premiumVsCoverage: data.premiumVsCoverage,
      },
      { transaction }
    );

    await FinancialProfile.upsert(
      {
        userId,
        budgetRange: data.budgetRange,
        willingToIncrease: data.willingToIncrease,
        paymentFrequency: data.paymentFrequency,
        riskAppetite: data.riskAppetite,
        selectedGoals: data.selectedGoals,
        monthlyHouseholdExpense: data.monthlyHouseholdExpense,
        existingSavings: data.existingSavings,
        existingLifeCover: data.existingLifeCover,
        homeLoanOutstanding: data.homeLoanOutstanding,
        personalBusinessLoan: data.personalBusinessLoan,
        totalEMI: data.totalEMI,
        retirementAge: data.retirementAge,
      },
      { transaction }
    );

    await PolicyProfile.upsert(
      {
        userId,
        recommendedPolicyType: data.recommendedPolicyType,
        selectedPolicyType: data.selectedPolicyType,
        waiverOfPremium: data.waiverOfPremium,
        criticalIllnessRider: data.criticalIllnessRider,
        accidentalRider: data.accidentalRider,
      },
      { transaction }
    );

    await transaction.commit();

    return { message: "Onboarding saved successfully" };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};