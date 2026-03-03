"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import type { OnboardingData, Persona } from "../onboarding/onboarding-flow"
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Home,
  IndianRupee,
  Shield,
  TrendingUp,
  Info,
  AlertCircle,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { saveOnboarding } from "@/lib/api/onboardingApi";

interface StepFiveProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

type PolicyType = "term" | "rop" | "ulip" | "endowment"
type IncomePeriod = "10" | "15" | "20" | "25"
type InflationType = "standard" | "conservative" | "aggressive"
type RiskType = "conservative" | "balanced" | "aggressive"

interface StepFiveFormData {
  primaryIncomeEarner: boolean | null
  spouseEarning: boolean | null
  monthlyHouseholdExpense: string
  existingSavings: string
  existingLifeCover: string
  homeLoanOutstanding: string
  personalBusinessLoan: string
  totalEMI: string
  selectedGoals: string[]
  childEducationCost: string
  retirementAge: number | null
  incomeReplacementPeriod: IncomePeriod | null
  inflationAssumption: InflationType | null
  riskAppetite: RiskType | null
  previousPolicySurrender: boolean | null
  recommendedPolicyType: PolicyType | null
  selectedPolicyType: PolicyType | null
  waiverOfPremium: boolean
  criticalIllnessRider: boolean
  accidentalRider: boolean
}

export default function StepFive({ data, onNext, onBack }: StepFiveProps) {
  
  const [formData, setFormData] = useState<StepFiveFormData>({
  primaryIncomeEarner: data.primaryIncomeEarner ?? null,
  spouseEarning: data.spouseEarning ?? null,
  monthlyHouseholdExpense: data.monthlyHouseholdExpense ?? "",
  existingSavings: data.existingSavings ?? "",
  existingLifeCover: data.existingLifeCover ?? "",
  homeLoanOutstanding: data.homeLoanOutstanding ?? "",
  personalBusinessLoan: data.personalBusinessLoan ?? "",
  totalEMI: data.totalEMI ?? "",
  selectedGoals: data.selectedGoals ?? [],
  childEducationCost: data.childEducationCost ?? "",
  retirementAge: data.retirementAge ?? null,
  incomeReplacementPeriod: data.incomeReplacementPeriod ?? null,
  inflationAssumption: data.inflationAssumption ?? null,
  riskAppetite: data.riskAppetite ?? null,
  previousPolicySurrender: data.previousPolicySurrender ?? null,
  recommendedPolicyType: data.recommendedPolicyType ?? null,
  selectedPolicyType: data.selectedPolicyType ?? null,
  waiverOfPremium: data.waiverOfPremium ?? false,
  criticalIllnessRider: data.criticalIllnessRider ?? false,
  accidentalRider: data.accidentalRider ?? false,
})

  // Calculate recommended policy and riders based on persona and data
 useEffect(() => {
  let recommendedType: PolicyType = "term"

  if (formData.selectedGoals.includes("wealth-creation")) {
    recommendedType = "ulip"
  } else if (formData.selectedGoals.includes("tax-legacy")) {
    recommendedType = "endowment"
  } else {
    recommendedType = "term"
  }

  const hasChildren = !!(data.childrenAges && data.childrenAges.length > 0)
  const isYoungEarner = !!(data.age && data.age < 40)
  const hasFamilyHistory = !!(data.existingDiseases && data.existingDiseases.length > 0)

  setFormData((prev) => ({
    ...prev,
    recommendedPolicyType: recommendedType,
    selectedPolicyType: prev.selectedPolicyType ?? recommendedType,
    waiverOfPremium: hasChildren,
    criticalIllnessRider: hasFamilyHistory,
    accidentalRider: isYoungEarner,
  }))
}, [formData.selectedGoals, data.childrenAges, data.age, data.existingDiseases])

  // Get mandatory goals based on persona
  const getMandatoryGoals = (persona: Persona): string[] => {
    switch (persona) {
      case "Young Guardian":
        return ["income-replacement"]
      case "Family Protector":
        return ["family-security"]
      case "Goal-Oriented Parent":
        return ["education"]
      case "Wealth Accumulator":
        return ["tax-legacy"]
      case "Retirement Planner":
        return ["pension-income"]
      default:
        return []
    }
  }

  const mandatoryGoals = getMandatoryGoals(data.persona)

  useEffect(() => {
    if (mandatoryGoals.length > 0) {
      setFormData((prev) => {
        // Only add mandatory goals if they're not already in selectedGoals
        const existingGoals = new Set(prev.selectedGoals)
        const goalsToAdd = mandatoryGoals.filter((goal) => !existingGoals.has(goal))

        if (goalsToAdd.length > 0) {
          return { ...prev, selectedGoals: [...prev.selectedGoals, ...goalsToAdd] }
        }
        return prev
      })
    }
  }, [mandatoryGoals])

  // Auto-estimate child education cost based on age
  useEffect(() => {
    if (data.childrenAges && data.childrenAges.length > 0 && !formData.childEducationCost) {
      const youngestChildAge = Math.min(...data.childrenAges)
      const yearsToCollege = Math.max(18 - youngestChildAge, 0)
      const currentCost = 2000000 // 20 lakhs base
      const inflationRate = 1.08 // 8% annual inflation
      const estimatedCost = Math.round(currentCost * Math.pow(inflationRate, yearsToCollege))
      setFormData((prev) => ({ ...prev, childEducationCost: estimatedCost.toString() }))
    }
  }, [data.childrenAges])

  const handleGoalToggle = (goal: string) => {
    if (mandatoryGoals.includes(goal)) return // Can't uncheck mandatory goals

    setFormData((prev) => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter((g) => g !== goal)
        : [...prev.selectedGoals, goal],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...data,
        ...formData,
      };

      await saveOnboarding(payload);

      onNext(formData);
    } catch (error: any) {
      console.error("Onboarding save error:", error.message);
    }
  };

  const isValid =
    formData.primaryIncomeEarner !== null &&
    (data.maritalStatus !== "married" || formData.spouseEarning !== null) &&
    formData.monthlyHouseholdExpense.trim() !== "" &&
    formData.existingSavings !== "" &&
    formData.selectedGoals.length > 0 &&
    formData.selectedPolicyType !== null &&
    formData.incomeReplacementPeriod !== null &&
    formData.inflationAssumption !== null &&
    formData.riskAppetite !== null &&
    formData.previousPolicySurrender !== null

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section A: Dependency & Responsibility */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Dependency & Responsibility"}</h3>
        </div>

        <div className="space-y-3">
          <Label>{"Are you the primary income earner?"}</Label>
          <RadioGroup
            value={formData.primaryIncomeEarner?.toString() || ""}
            onValueChange={(value) => setFormData({ ...formData, primaryIncomeEarner: value === "true" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="primary-yes" />
              <Label htmlFor="primary-yes" className="font-normal cursor-pointer">
                {"Yes, I'm the primary earner"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="primary-no" />
              <Label htmlFor="primary-no" className="font-normal cursor-pointer">
                {"No, I'm not the primary earner"}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {data.maritalStatus === "married" && (
          <div className="space-y-3">
            <Label>{"Is your spouse earning?"}</Label>
            <RadioGroup
              value={formData.spouseEarning?.toString() || ""}
              onValueChange={(value) => setFormData({ ...formData, spouseEarning: value === "true" })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="spouse-yes" />
                <Label htmlFor="spouse-yes" className="font-normal cursor-pointer">
                  {"Yes"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="spouse-no" />
                <Label htmlFor="spouse-no" className="font-normal cursor-pointer">
                  {"No"}
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>

      <Separator />

      {/* Section B: Income & Cashflow */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Income & Cashflow"}</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-expense">{"Monthly Household Expense"}</Label>
            <Input
              id="monthly-expense"
              type="number"
              placeholder="₹50,000"
              value={formData.monthlyHouseholdExpense}
              onChange={(e) => setFormData({ ...formData, monthlyHouseholdExpense: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="savings">{"Existing Savings"}</Label>
            <select
              id="savings"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.existingSavings}
              onChange={(e) => setFormData({ ...formData, existingSavings: e.target.value })}
            >
              <option value="">Select range</option>
              <option value="0-5L">{"₹0 - ₹5 Lakhs"}</option>
              <option value="5-10L">{"₹5 - ₹10 Lakhs"}</option>
              <option value="10-25L">{"₹10 - ₹25 Lakhs"}</option>
              <option value="25-50L">{"₹25 - ₹50 Lakhs"}</option>
              <option value="50L+">{"₹50 Lakhs+"}</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="existing-cover">{"Existing Life Cover (if any)"}</Label>
            <Input
              id="existing-cover"
              type="text"
              placeholder="₹50,00,000 or leave blank if none"
              value={formData.existingLifeCover}
              onChange={(e) => setFormData({ ...formData, existingLifeCover: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Section C: Liabilities */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Liabilities"}</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="home-loan">{"Home Loan Outstanding"}</Label>
            <Input
              id="home-loan"
              type="text"
              placeholder="₹30,00,000 or 0"
              value={formData.homeLoanOutstanding}
              onChange={(e) => setFormData({ ...formData, homeLoanOutstanding: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other-loan">{"Personal/Business Loan"}</Label>
            <Input
              id="other-loan"
              type="text"
              placeholder="₹5,00,000 or 0"
              value={formData.personalBusinessLoan}
              onChange={(e) => setFormData({ ...formData, personalBusinessLoan: e.target.value })}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="total-emi">{"Total Monthly EMI Amount"}</Label>
            <Input
              id="total-emi"
              type="text"
              placeholder="₹35,000"
              value={formData.totalEMI}
              onChange={(e) => setFormData({ ...formData, totalEMI: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Section D: Goals */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Financial Goals"}</h3>
        </div>

        {data.persona && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Based on your profile as a <strong>{data.persona}</strong>, certain goals are recommended for you.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          {[
            { id: "income-replacement", label: "Income Replacement", persona: "Young Guardian" },
            { id: "family-security", label: "Family Security & Kids Protection", persona: "Family Protector" },
            { id: "education", label: "Children's Education", persona: "Goal-Oriented Parent" },
            { id: "tax-legacy", label: "Tax Benefit & Legacy Planning", persona: "Wealth Accumulator" },
            { id: "pension-income", label: "Retirement Pension Income", persona: "Retirement Planner" },
            { id: "wealth-creation", label: "Wealth Creation", persona: null },
          ].map((goal) => {
            const isMandatory = mandatoryGoals.includes(goal.id)
            const isChecked = isMandatory || formData.selectedGoals.includes(goal.id)

            return (
              <div
                key={goal.id}
                className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  isMandatory ? "bg-primary/5 border-primary/20" : "bg-background"
                }`}
              >
                <Checkbox
                  id={goal.id}
                  checked={isChecked}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                  disabled={isMandatory}
                />
                <Label htmlFor={goal.id} className="font-normal cursor-pointer flex-1">
                  {goal.label}
                  {isMandatory && <span className="ml-2 text-xs text-primary font-medium">{"(Recommended)"}</span>}
                </Label>
              </div>
            )
          })}
        </div>

        {/* Dynamic inputs based on goals */}
        {(formData.selectedGoals.includes("education") || mandatoryGoals.includes("education")) && (
          <div className="space-y-2">
            <Label htmlFor="education-cost">{"Child Education Cost (AI Estimated, Editable)"}</Label>
            <Input
              id="education-cost"
              type="text"
              placeholder="₹20,00,000"
              value={formData.childEducationCost}
              onChange={(e) => setFormData({ ...formData, childEducationCost: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              {"Estimated based on child's age and 8% annual education inflation"}
            </p>
          </div>
        )}

        {(formData.selectedGoals.includes("pension-income") || mandatoryGoals.includes("pension-income")) && (
          <div className="space-y-2">
            <Label htmlFor="retirement-age">{"Target Retirement Age"}</Label>
            <Input
              id="retirement-age"
              type="number"
              placeholder="60"
              value={formData.retirementAge || ""}
              onChange={(e) => setFormData({ ...formData, retirementAge: Number(e.target.value) })}
            />
          </div>
        )}

        {/* New goal preference fields */}
        <div className="space-y-3">
          <Label>{"Desired income replacement period"}</Label>
          <div className="grid grid-cols-4 gap-2">
            {["10", "15", "20", "25"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, incomeReplacementPeriod: period as "10" | "15" | "20" | "25" })
                }
                className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.incomeReplacementPeriod === period
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                {period} years
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>{"Inflation assumption preference"}</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "standard", label: "Standard" },
              { value: "conservative", label: "Conservative" },
              { value: "aggressive", label: "Aggressive" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    inflationAssumption: option.value as "standard" | "conservative" | "aggressive",
                  })
                }
                className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.inflationAssumption === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>{"Risk appetite"}</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "conservative", label: "Conservative" },
              { value: "balanced", label: "Balanced" },
              { value: "aggressive", label: "Aggressive" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, riskAppetite: option.value as "conservative" | "balanced" | "aggressive" })
                }
                className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.riskAppetite === option.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-0.5">
            <Label htmlFor="policy-surrender" className="cursor-pointer">
              {"Previous policy surrender or bad experience?"}
            </Label>
            <p className="text-xs text-muted-foreground">{"Helps us understand your insurance history"}</p>
          </div>
          <Switch
            id="policy-surrender"
            checked={formData.previousPolicySurrender || false}
            onCheckedChange={(checked) => setFormData({ ...formData, previousPolicySurrender: checked })}
          />
        </div>
      </div>

      <Separator />

      {/* Section E: Policy Type Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Recommended Policy Type"}</h3>
        </div>

        {formData.recommendedPolicyType && (
          <Alert className="border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Based on your needs, <strong>{formData.recommendedPolicyType.toUpperCase()}</strong> is strongly
              recommended.
            </AlertDescription>
          </Alert>
        )}

        <RadioGroup
          value={formData.selectedPolicyType || ""}
          onValueChange={(value: "term" | "rop" | "ulip" | "endowment") =>
            setFormData({ ...formData, selectedPolicyType: value })
          }
          className="space-y-2"
        >
          <div>
            <RadioGroupItem value="term" id="policy-term" className="peer sr-only" />
            <Label
              htmlFor="policy-term"
              className="flex items-start justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium">{"Term Insurance"}</p>
                <p className="text-xs text-muted-foreground">{"Pure protection, maximum coverage at lowest cost"}</p>
              </div>
              {formData.recommendedPolicyType === "term" && (
                <span className="text-xs text-primary font-medium">{"Recommended"}</span>
              )}
            </Label>
          </div>

          <div>
            <RadioGroupItem value="rop" id="policy-rop" className="peer sr-only" />
            <Label
              htmlFor="policy-rop"
              className="flex items-start justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium">{"Return of Premium (ROP)"}</p>
                <p className="text-xs text-muted-foreground">{"Get premiums back if no claims"}</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="ulip" id="policy-ulip" className="peer sr-only" />
            <Label
              htmlFor="policy-ulip"
              className="flex items-start justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium">{"ULIP (Unit Linked)"}</p>
                <p className="text-xs text-muted-foreground">{"Insurance + investment in one"}</p>
              </div>
              {formData.recommendedPolicyType === "ulip" && (
                <span className="text-xs text-primary font-medium">{"Recommended"}</span>
              )}
            </Label>
          </div>

          <div>
            <RadioGroupItem value="endowment" id="policy-endowment" className="peer sr-only" />
            <Label
              htmlFor="policy-endowment"
              className="flex items-start justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium">{"Endowment"}</p>
                <p className="text-xs text-muted-foreground">{"Savings plan with guaranteed maturity benefit"}</p>
              </div>
              {formData.recommendedPolicyType === "endowment" && (
                <span className="text-xs text-primary font-medium">{"Recommended"}</span>
              )}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Section F: Riders */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">{"Recommended Riders"}</h3>
        </div>

        <Alert className="border-primary/20 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{"Based on your profile, we've auto-suggested riders. Toggle as needed."}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="waiver" className="cursor-pointer">
                {"Waiver of Premium"}
              </Label>
              <p className="text-xs text-muted-foreground">
                {"Continues policy if you can't pay premiums due to disability"}
              </p>
            </div>
            <Switch
              id="waiver"
              checked={formData.waiverOfPremium}
              onCheckedChange={(checked) => setFormData({ ...formData, waiverOfPremium: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="critical-rider" className="cursor-pointer">
                {"Critical Illness Rider"}
              </Label>
              <p className="text-xs text-muted-foreground">{"Lump sum payout on diagnosis of critical illnesses"}</p>
            </div>
            <Switch
              id="critical-rider"
              checked={formData.criticalIllnessRider}
              onCheckedChange={(checked) => setFormData({ ...formData, criticalIllnessRider: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="accidental" className="cursor-pointer">
                {"Accidental Death Benefit"}
              </Label>
              <p className="text-xs text-muted-foreground">{"Additional payout if death occurs due to accident"}</p>
            </div>
            <Switch
              id="accidental"
              checked={formData.accidentalRider}
              onCheckedChange={(checked) => setFormData({ ...formData, accidentalRider: checked })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" onClick={onBack} variant="outline" size="lg" className="gap-2 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          {"Back"}
        </Button>
        <Button type="submit" disabled={!isValid} size="lg" className="gap-2">
          {"Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
