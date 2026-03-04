"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { OnboardingData } from "../onboarding/onboarding-flow"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StepFourProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

export default function StepFour({ data, onNext, onBack }: StepFourProps) {
  const [formData, setFormData] = useState({
    budgetRange: data.budgetRange || "",
    willingToIncrease: data.willingToIncrease ?? null,
    paymentFrequency: data.paymentFrequency ?? null,
    comfortWithLockIn: data.comfortWithLockIn ?? null,
    jobIncomeChangeLikelihood: data.jobIncomeChangeLikelihood ?? null,
    brandReputationImportance: data.brandReputationImportance ?? null,
    digitalVsRMPreference: data.digitalVsRMPreference ?? null,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
    setSubmitted(true)
  }

  const isValid =
    formData.budgetRange &&
    formData.willingToIncrease !== null &&
    formData.paymentFrequency &&
    formData.comfortWithLockIn &&
    formData.jobIncomeChangeLikelihood &&
    formData.brandReputationImportance &&
    formData.digitalVsRMPreference

  if (submitted) {
    return (
      <div className="space-y-4 sm:space-y-6 text-center py-6 sm:py-8">
        <div className="flex justify-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary/20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-balance px-2">{"Profile Complete!"}</h2>
          <p className="text-sm sm:text-base text-muted-foreground text-balance px-4">
            {"We're analyzing your insurance needs to provide personalized recommendations."}
          </p>
        </div>

        <Card className="p-3 sm:p-4 bg-primary/5 border-primary/20 text-left">
          <p className="text-xs sm:text-sm font-medium mb-2">{"What's Next?"}</p>
          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
            <li>{"• Personalized health insurance recommendations"}</li>
            <li>{"• Life insurance coverage calculations"}</li>
            <li>{"• Compare quotes from 20+ insurers"}</li>
            <li>{"• Expert guidance for policy selection"}</li>
          </ul>
        </Card>

        <Button size="lg" className="w-full h-10 sm:h-11 text-sm sm:text-base" onClick={() => window.location.reload()}>
          {"Start New Application"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Annual Premium Comfort Range"}</Label>
        <RadioGroup
          value={formData.budgetRange}
          onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
          className="space-y-2"
        >
          <div>
            <RadioGroupItem value="10-20k" id="budget-1" className="peer sr-only" />
            <Label
              htmlFor="budget-1"
              className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-sm sm:text-base">{"₹10,000 - ₹20,000"}</p>
                <p className="text-xs text-muted-foreground">{"Basic coverage, good for starters"}</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="20-35k" id="budget-2" className="peer sr-only" />
            <Label
              htmlFor="budget-2"
              className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-sm sm:text-base">{"₹20,000 - ₹35,000"}</p>
                <p className="text-xs text-muted-foreground">{"Comprehensive coverage for families"}</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="35-60k" id="budget-3" className="peer sr-only" />
            <Label
              htmlFor="budget-3"
              className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-sm sm:text-base">{"₹35,000 - ₹60,000"}</p>
                <p className="text-xs text-muted-foreground">{"Premium plans with all benefits"}</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="60k+" id="budget-4" className="peer sr-only" />
            <Label
              htmlFor="budget-4"
              className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
            >
              <div>
                <p className="font-medium text-sm sm:text-base">{"₹60,000+"}</p>
                <p className="text-xs text-muted-foreground">{"Ultra-premium with maximum coverage"}</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Preferred Payment Frequency"}</Label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Button
            type="button"
            variant={formData.paymentFrequency === "annual" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-sm sm:text-base"
            onClick={() => setFormData({ ...formData, paymentFrequency: "annual" })}
          >
            Annual
          </Button>
          <Button
            type="button"
            variant={formData.paymentFrequency === "monthly" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-sm sm:text-base"
            onClick={() => setFormData({ ...formData, paymentFrequency: "monthly" })}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Comfort with Long-term Lock-in"}</Label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Button
            type="button"
            variant={formData.comfortWithLockIn === "low" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, comfortWithLockIn: "low" })}
          >
            Low
          </Button>
          <Button
            type="button"
            variant={formData.comfortWithLockIn === "medium" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, comfortWithLockIn: "medium" })}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={formData.comfortWithLockIn === "high" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, comfortWithLockIn: "high" })}
          >
            High
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Likelihood of Job/Income Change in Next 3 Years"}</Label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Button
            type="button"
            variant={formData.jobIncomeChangeLikelihood === "low" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, jobIncomeChangeLikelihood: "low" })}
          >
            Low
          </Button>
          <Button
            type="button"
            variant={formData.jobIncomeChangeLikelihood === "medium" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, jobIncomeChangeLikelihood: "medium" })}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={formData.jobIncomeChangeLikelihood === "high" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, jobIncomeChangeLikelihood: "high" })}
          >
            High
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Brand Reputation Importance"}</Label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Button
            type="button"
            variant={formData.brandReputationImportance === "low" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, brandReputationImportance: "low" })}
          >
            Low
          </Button>
          <Button
            type="button"
            variant={formData.brandReputationImportance === "medium" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, brandReputationImportance: "medium" })}
          >
            Medium
          </Button>
          <Button
            type="button"
            variant={formData.brandReputationImportance === "high" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 text-xs sm:text-base"
            onClick={() => setFormData({ ...formData, brandReputationImportance: "high" })}
          >
            High
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Digital vs RM-assisted Preference"}</Label>
        <div className="grid grid-cols-1 gap-2 sm:gap-3">
          <Button
            type="button"
            variant={formData.digitalVsRMPreference === "digital" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 justify-start text-sm sm:text-base"
            onClick={() => setFormData({ ...formData, digitalVsRMPreference: "digital" })}
          >
            Digital (Self-service)
          </Button>
          <Button
            type="button"
            variant={formData.digitalVsRMPreference === "rm-assisted" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 justify-start text-sm sm:text-base"
            onClick={() => setFormData({ ...formData, digitalVsRMPreference: "rm-assisted" })}
          >
            RM-assisted (Personal guidance)
          </Button>
          <Button
            type="button"
            variant={formData.digitalVsRMPreference === "no-preference" ? "default" : "outline"}
            className="h-auto py-2.5 sm:py-3 justify-start text-sm sm:text-base"
            onClick={() => setFormData({ ...formData, digitalVsRMPreference: "no-preference" })}
          >
            No Preference
          </Button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <Label className="text-sm sm:text-base">{"Willing to Increase Premium for Better Coverage?"}</Label>
        <RadioGroup
          value={formData.willingToIncrease?.toString() || ""}
          onValueChange={(value) => setFormData({ ...formData, willingToIncrease: value === "true" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="increase-yes" />
            <Label htmlFor="increase-yes" className="font-normal cursor-pointer text-sm sm:text-base">
              {"Yes, show me better options even if premium is higher"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="increase-no" />
            <Label htmlFor="increase-no" className="font-normal cursor-pointer text-sm sm:text-base">
              {"No, stick to my budget range"}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          {
            "💡 Tip: Higher premiums often mean lower co-payments, better hospital networks, and faster claim settlements."
          }
        </p>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2 sm:pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          size="lg"
          className="gap-2 bg-transparent h-10 sm:h-11 text-sm sm:text-base order-2 sm:order-1"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {"Back"}
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          size="lg"
          className="gap-2 h-10 sm:h-11 text-sm sm:text-base order-1 sm:order-2"
        >
          {"Complete Profile"}
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </form>
  )
}
