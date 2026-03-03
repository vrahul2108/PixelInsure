"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import type { OnboardingData } from "../onboarding/onboarding-flow"
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StepThreeProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

export default function StepThree({ data, onNext, onBack }: StepThreeProps) {
  const [formData, setFormData] = useState({
    coverageAmount: data.coverageAmount || "10L",
    roomRent: data.roomRent || null,
    restoreBenefit: data.restoreBenefit ?? null,
    daycare: data.daycare ?? true,
    opd: data.opd ?? false,
    maternity: data.maternity ?? false,
    criticalIllness: data.criticalIllness ?? false,
    cashlessPreferred: data.cashlessPreferred ?? null,
    shortWaitingPeriod: data.shortWaitingPeriod ?? null,
    premiumVsCoverage: data.premiumVsCoverage ?? 50,
    willingnessToAcceptCopay: data.willingnessToAcceptCopay ?? null,
    insurerPreference: data.insurerPreference || null,
    homeHealthcareImportant: data.homeHealthcareImportant ?? null,
    annualHealthCheckupImportant: data.annualHealthCheckupImportant ?? null,
  })

  const getRecommendedCoverage = () => {
    const familyMembers = 1 + (data.spouseAge ? 1 : 0) + data.childrenAges.length + data.parentsAges.length
    const cityMultiplier = data.cityTier === "metro" ? 1.5 : 1

    if (familyMembers <= 2) {
      return cityMultiplier > 1 ? "10-15L" : "5-10L"
    } else if (familyMembers <= 4) {
      return cityMultiplier > 1 ? "15-20L" : "10-15L"
    } else {
      return cityMultiplier > 1 ? "20-25L" : "15-20L"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const isValid =
    formData.coverageAmount &&
    formData.roomRent &&
    formData.willingnessToAcceptCopay !== null &&
    formData.insurerPreference !== null &&
    formData.homeHealthcareImportant !== null &&
    formData.annualHealthCheckupImportant !== null

  const showMaternity = (data.age || 0) < 40 && data.maritalStatus === "married"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-4 bg-secondary/20 border-secondary">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">{"AI Recommendation"}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {"Based on your profile, we recommend "}
              <span className="font-semibold text-foreground">{`₹${getRecommendedCoverage()}`}</span>
              {" coverage. You can adjust below."}
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Label>{"Coverage Amount"}</Label>
        <RadioGroup
          value={formData.coverageAmount}
          onValueChange={(value) => setFormData({ ...formData, coverageAmount: value })}
          className="grid grid-cols-3 gap-3"
        >
          {["5L", "10L", "15L", "20L", "25L", "30L"].map((amount) => (
            <div key={amount}>
              <RadioGroupItem value={amount} id={`coverage-${amount}`} className="peer sr-only" />
              <Label
                htmlFor={`coverage-${amount}`}
                className="flex items-center justify-center rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-colors"
              >
                {`₹${amount}`}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>{"Room Rent"}</Label>
        <RadioGroup
          value={formData.roomRent || ""}
          onValueChange={(value) => setFormData({ ...formData, roomRent: value as OnboardingData["roomRent"] })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no-cap" id="room-nocap" />
            <Label htmlFor="room-nocap" className="font-normal cursor-pointer">
              {"No Cap (Premium)"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="single-private" id="room-single" />
            <Label htmlFor="room-single" className="font-normal cursor-pointer">
              {"Single Private Room"}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>{"Benefit Preferences"}</Label>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-0.5">
            <Label htmlFor="restore" className="cursor-pointer">
              {"Restore Benefit"}
            </Label>
            <p className="text-xs text-muted-foreground">{"Restore sum insured if exhausted"}</p>
          </div>
          <Switch
            id="restore"
            checked={formData.restoreBenefit ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, restoreBenefit: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
          <div className="space-y-0.5">
            <Label htmlFor="daycare" className="cursor-pointer">
              {"Daycare Procedures"}
            </Label>
            <p className="text-xs text-muted-foreground">{"Treatments without hospitalization"}</p>
          </div>
          <Switch
            id="daycare"
            checked={formData.daycare}
            onCheckedChange={(checked) => setFormData({ ...formData, daycare: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-0.5">
            <Label htmlFor="opd" className="cursor-pointer">
              {"OPD Coverage"}
            </Label>
            <p className="text-xs text-muted-foreground">{"Outpatient department expenses"}</p>
          </div>
          <Switch
            id="opd"
            checked={formData.opd}
            onCheckedChange={(checked) => setFormData({ ...formData, opd: checked })}
          />
        </div>

        {showMaternity && (
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="space-y-0.5">
              <Label htmlFor="maternity" className="cursor-pointer">
                {"Maternity Coverage"}
              </Label>
              <p className="text-xs text-muted-foreground">{"Pregnancy and childbirth expenses"}</p>
            </div>
            <Switch
              id="maternity"
              checked={formData.maternity}
              onCheckedChange={(checked) => setFormData({ ...formData, maternity: checked })}
            />
          </div>
        )}

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-0.5">
            <Label htmlFor="critical" className="cursor-pointer">
              {"Critical Illness Rider"}
            </Label>
            <p className="text-xs text-muted-foreground">{"Lump sum for critical diseases"}</p>
          </div>
          <Switch
            id="critical"
            checked={formData.criticalIllness}
            onCheckedChange={(checked) => setFormData({ ...formData, criticalIllness: checked })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>{"Policy Quality Preferences"}</Label>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label htmlFor="cashless" className="cursor-pointer">
            {"Cashless Hospital Preferred?"}
          </Label>
          <Switch
            id="cashless"
            checked={formData.cashlessPreferred ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, cashlessPreferred: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label htmlFor="waiting" className="cursor-pointer">
            {"Short Waiting Period Important?"}
          </Label>
          <Switch
            id="waiting"
            checked={formData.shortWaitingPeriod ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, shortWaitingPeriod: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label htmlFor="copay" className="cursor-pointer">
            {"Willingness to accept co-pay?"}
          </Label>
          <Switch
            id="copay"
            checked={formData.willingnessToAcceptCopay ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, willingnessToAcceptCopay: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label htmlFor="home-healthcare" className="cursor-pointer">
            {"Home healthcare / domiciliary treatment important?"}
          </Label>
          <Switch
            id="home-healthcare"
            checked={formData.homeHealthcareImportant ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, homeHealthcareImportant: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg border">
          <Label htmlFor="health-checkup" className="cursor-pointer">
            {"Annual health check-up important?"}
          </Label>
          <Switch
            id="health-checkup"
            checked={formData.annualHealthCheckupImportant ?? false}
            onCheckedChange={(checked) => setFormData({ ...formData, annualHealthCheckupImportant: checked })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>{"Preference for Private Insurer vs PSU"}</Label>
        <p className="text-xs text-muted-foreground">{"Choose your preferred insurer type"}</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "private", label: "Private" },
            { value: "psu", label: "PSU" },
            { value: "no-preference", label: "No Preference" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, insurerPreference: option.value as OnboardingData["insurerPreference"] })
              }
              className={`p-3 rounded-lg border-2 transition-colors ${
                formData.insurerPreference === option.value
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
        <Label>{"Lower Premium vs Better Coverage"}</Label>
        <div className="pt-2">
          <Slider
            value={[formData.premiumVsCoverage]}
            onValueChange={(value) => setFormData({ ...formData, premiumVsCoverage: value[0] })}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{"Lower Premium"}</span>
            <span>{"Better Coverage"}</span>
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
