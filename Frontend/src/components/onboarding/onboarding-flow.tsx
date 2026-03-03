"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import StepZero from "../steps/step-zero"
import StepOne from "../steps/step-one"
import StepTwo from "../steps/step-two"
import StepThree from "../steps/step-three"
import StepFour from "../steps/step-four"
import StepFive from "../steps/step-five"
import { Check } from "lucide-react"
import { api } from "@/lib/api/client"

export type Persona =
  | "Young Guardian"
  | "Family Protector"
  | "Goal-Oriented Parent"
  | "Wealth Accumulator"
  | "Retirement Planner"
  | null

export interface OnboardingData {
  // Step 0
  name: string
  gender: "male" | "female" | "other" | null
  age: number | null
  maritalStatus: "single" | "married" | "divorced" | "widowed" | null
  dependents: number | null
  annualIncome: string
  employmentType: string
  educationLevel: string | null   
  persona: Persona

  // Step 1
  spouseAge: number | null
  childrenAges: number[]
  parentsAges: number[]
  parentsFinanciallyDependent: boolean | null
  childrenPlannedIn3To5Years: boolean | null
  city: string
  cityTier: "metro" | "non-metro" | null

  // Step 2
  existingDiseases: string[]
  hospitalizationLast3Years: boolean | null
  smoking: boolean | null
  alcohol: "none" | "occasional" | "regular" | null
  height: number | null
  weight: number | null
  bmi: number | null
  willingnessToAcceptCopay: boolean | null
  insurerPreference: "private" | "psu" | "no-preference" | null
  homeHealthcareImportant: boolean | null
  annualHealthCheckupImportant: boolean | null

  // Step 3
  coverageAmount: string
  roomRent: "no-cap" | "single-private" | null
  restoreBenefit: boolean | null
  daycare: boolean
  opd: boolean
  maternity: boolean
  criticalIllness: boolean
  cashlessPreferred: boolean | null
  shortWaitingPeriod: boolean | null
  premiumVsCoverage: number

  // Step 4
  budgetRange: string
  willingToIncrease: boolean | null
  paymentFrequency: "annual" | "monthly" | null
  comfortWithLockIn: "low" | "medium" | "high" | null
  jobIncomeChangeLikelihood: "low" | "medium" | "high" | null
  brandReputationImportance: "low" | "medium" | "high" | null
  digitalVsRMPreference: "digital" | "rm-assisted" | "no-preference" | null

  // Life Insurance - Dependency & Responsibility
  primaryIncomeEarner: boolean | null
  spouseEarning: boolean | null
  familyMedicalHistory: boolean | null
  physicalActivityLevel: "low" | "moderate" | "high" | null

  // Life Insurance - Income & Cashflow
  monthlyHouseholdExpense: string
  existingSavings: string
  existingLifeCover: string

  // Life Insurance - Liabilities
  homeLoanOutstanding: string
  personalBusinessLoan: string
  totalEMI: string

  // Life Insurance - Goals
  selectedGoals: string[]
  childEducationCost: string
  retirementAge: number | null
  incomeReplacementPeriod: "10" | "15" | "20" | "25" | null
  inflationAssumption: "standard" | "conservative" | "aggressive" | null
  riskAppetite: "conservative" | "balanced" | "aggressive" | null
  previousPolicySurrender: boolean | null

  // Life Insurance - Policy Type
  recommendedPolicyType: "term" | "rop" | "ulip" | "endowment" | null
  selectedPolicyType: "term" | "rop" | "ulip" | "endowment" | null

  // Life Insurance - Riders
  waiverOfPremium: boolean
  criticalIllnessRider: boolean
  accidentalRider: boolean
}

const steps = [
  { id: 0, title: "Basic Info", description: "Tell us about yourself" },
  { id: 1, title: "Family", description: "Your family details" },
  { id: 2, title: "Life", description: "Income protection" },
  { id: 3, title: "Health", description: "Medical & lifestyle" },
  { id: 4, title: "Goals", description: "Your financial goals" },
  { id: 5, title: "Coverage", description: "Your preferences" },
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    name: "",
    gender: null,
    age: null,
    maritalStatus: null,
    dependents: null,
    annualIncome: "",
    employmentType: "",
    educationLevel: null,
    persona: null,
    spouseAge: null,
    childrenAges: [],
    parentsAges: [],
    parentsFinanciallyDependent: null,
    childrenPlannedIn3To5Years: null,
    city: "",
    cityTier: null,
    existingDiseases: [],
    hospitalizationLast3Years: null,
    smoking: null,
    alcohol: null,
    height: null,
    weight: null,
    bmi: null,
    willingnessToAcceptCopay: null,
    insurerPreference: null,
    homeHealthcareImportant: null,
    annualHealthCheckupImportant: null,
    coverageAmount: "",
    roomRent: null,
    restoreBenefit: null,
    daycare: true,
    opd: false,
    maternity: false,
    criticalIllness: false,
    cashlessPreferred: null,
    shortWaitingPeriod: null,
    premiumVsCoverage: 50,
    budgetRange: "",
    willingToIncrease: null,
    paymentFrequency: null,
    comfortWithLockIn: null,
    jobIncomeChangeLikelihood: null,
    brandReputationImportance: null,
    digitalVsRMPreference: null,
    primaryIncomeEarner: null,
    spouseEarning: null,
    familyMedicalHistory: null,
    physicalActivityLevel: null,
    monthlyHouseholdExpense: "",
    existingSavings: "",
    existingLifeCover: "",
    homeLoanOutstanding: "",
    personalBusinessLoan: "",
    totalEMI: "",
    selectedGoals: [],
    childEducationCost: "",
    retirementAge: null,
    incomeReplacementPeriod: null,
    inflationAssumption: null,
    riskAppetite: null,
    previousPolicySurrender: null,
    recommendedPolicyType: null,
    selectedPolicyType: null,
    waiverOfPremium: false,
    criticalIllnessRider: false,
    accidentalRider: false,
  })

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = async (stepData: Partial<OnboardingData>) => {
    const newData = { ...data, ...stepData };
    setData(newData);

    await api("/onboarding/save", {
      method: "POST",
      body: JSON.stringify({
        ...newData,
        step: currentStep + 1,
      }),
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = await api("/onboarding/progress");

        if (res.step !== undefined) {
          setCurrentStep(res.step);
        }
      } catch (err) {
        console.log("Progress load failed");
      }
    };

    loadProgress();
  }, []);

  useEffect(() => {
  const fetchProgress = async () => {
    const res = await api("/onboarding/progress");
    if (res.step !== undefined) {
      setCurrentStep(res.step);
    }
  };

  fetchProgress();
}, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-balance px-2">
            {"Find Your Perfect Insurance"}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
            {"Complete your profile in 6 simple steps"}
          </p>
        </div>

        <div className="mb-4 sm:mb-6 lg:mb-8 px-2">
          <Progress value={progress} className="h-1.5 sm:h-2 mb-2 sm:mb-3 lg:mb-4" />
          <div className="flex justify-between items-center gap-1 sm:gap-2">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-0.5 sm:gap-1 lg:gap-2 flex-1">
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs lg:text-sm font-medium transition-colors ${
                    idx < currentStep
                      ? "bg-primary text-primary-foreground"
                      : idx === currentStep
                        ? "bg-primary text-primary-foreground ring-2 sm:ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx < currentStep ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4" /> : idx + 1}
                </div>
                <div className="text-center hidden sm:block">
                  <p className="text-[10px] sm:text-xs font-medium">{step.title}</p>
                  <p className="text-[9px] sm:text-xs text-muted-foreground hidden lg:block">{step.description}</p>
                </div>
                <div className="text-center sm:hidden">
                  <p className="text-[9px] font-medium leading-tight">{step.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-3 sm:pb-4 lg:pb-6 px-3 sm:px-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl">{steps[currentStep].title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm lg:text-base">
              {steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6">
            {currentStep === 0 && <StepZero data={data} onNext={handleNext} />}
            {currentStep === 1 && <StepOne data={data} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 2 && <StepTwo data={data} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 3 && <StepThree data={data} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 4 && <StepFive data={data} onNext={handleNext} onBack={handleBack} />}
            {currentStep === 5 && <StepFour data={data} onNext={handleNext} onBack={handleBack} />}
          </CardContent>
        </Card>

        {data.persona && (
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <span className="opacity-0">Persona: {data.persona}</span>
          </div>
        )}
      </div>
    </div>
  )
}
