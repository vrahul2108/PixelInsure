"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import type { OnboardingData } from "../onboarding/onboarding-flow"
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface StepTwoProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

const commonDiseases = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Thyroid",
  "Kidney Disease",
  "Cancer",
  "Arthritis",
]

export default function StepTwo({ data, onNext, onBack }: StepTwoProps) {
  const [formData, setFormData] = useState({
    existingDiseases: data.existingDiseases || [],
    hospitalizationLast3Years: data.hospitalizationLast3Years ?? null,
    smoking: data.smoking ?? null,
    alcohol: data.alcohol || null,
    height: data.height || null,
    weight: data.weight || null,
    familyMedicalHistory: data.familyMedicalHistory ?? null,
    physicalActivityLevel: data.physicalActivityLevel || null,
    willingnessToAcceptCopay: data.willingnessToAcceptCopay ?? null,
    insurerPreference: data.insurerPreference || null,
    homeHealthcareImportant: data.homeHealthcareImportant ?? null,
    annualHealthCheckupImportant: data.annualHealthCheckupImportant ?? null,
  })

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100
      return Number.parseFloat((formData.weight / (heightInMeters * heightInMeters)).toFixed(1))
    }
    return null
  }

  const handleDiseaseToggle = (disease: string) => {
    if (formData.existingDiseases.includes(disease)) {
      setFormData({
        ...formData,
        existingDiseases: formData.existingDiseases.filter((d) => d !== disease),
      })
    } else {
      setFormData({
        ...formData,
        existingDiseases: [...formData.existingDiseases, disease],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bmi = calculateBMI()
    onNext({
      ...formData,
      bmi,
    })
  }

  const isValid =
    formData.hospitalizationLast3Years !== null &&
    formData.smoking !== null &&
    formData.alcohol !== null &&
    formData.height !== null &&
    formData.weight !== null &&
    formData.familyMedicalHistory !== null &&
    formData.physicalActivityLevel !== null

  const bmi = calculateBMI()
  const showWarning =
    formData.existingDiseases.length > 0 ||
    formData.smoking ||
    formData.hospitalizationLast3Years ||
    formData.familyMedicalHistory

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label>{"Any Existing Diseases? (Select all that apply)"}</Label>
        <div className="grid grid-cols-2 gap-3">
          {commonDiseases.map((disease) => (
            <div key={disease} className="flex items-center space-x-2">
              <Checkbox
                id={disease}
                checked={formData.existingDiseases.includes(disease)}
                onCheckedChange={() => handleDiseaseToggle(disease)}
              />
              <label
                htmlFor={disease}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {disease}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="family-medical-history" className="text-base cursor-pointer">
              {"Family medical history of critical illness?"}
            </Label>
          </div>
          <Switch
            id="family-medical-history"
            checked={formData.familyMedicalHistory || false}
            onCheckedChange={(checked) => setFormData({ ...formData, familyMedicalHistory: checked })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>{"Physical activity level"}</Label>
        <div className="grid grid-cols-3 gap-3">
          {(["low", "moderate", "high"] as const).map((level) => (
            <Button
              key={level}
              type="button"
              variant={formData.physicalActivityLevel === level ? "default" : "outline"}
              className="capitalize"
              onClick={() => setFormData({ ...formData, physicalActivityLevel: level })}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>{"Hospitalization in Last 3 Years?"}</Label>
        <RadioGroup
          value={formData.hospitalizationLast3Years?.toString() || ""}
          onValueChange={(value) => setFormData({ ...formData, hospitalizationLast3Years: value === "true" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="hosp-no" />
            <Label htmlFor="hosp-no" className="font-normal cursor-pointer">
              {"No"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="hosp-yes" />
            <Label htmlFor="hosp-yes" className="font-normal cursor-pointer">
              {"Yes"}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>{"Do You Smoke?"}</Label>
          <RadioGroup
            value={formData.smoking?.toString() || ""}
            onValueChange={(value) => setFormData({ ...formData, smoking: value === "true" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="smoke-no" />
              <Label htmlFor="smoke-no" className="font-normal cursor-pointer">
                {"No"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="smoke-yes" />
              <Label htmlFor="smoke-yes" className="font-normal cursor-pointer">
                {"Yes"}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>{"Alcohol Consumption"}</Label>
          <RadioGroup
            value={formData.alcohol || ""}
            onValueChange={(value) => setFormData({ ...formData, alcohol: value as OnboardingData["alcohol"] })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="alcohol-none" />
              <Label htmlFor="alcohol-none" className="font-normal cursor-pointer">
                {"None"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="occasional" id="alcohol-occasional" />
              <Label htmlFor="alcohol-occasional" className="font-normal cursor-pointer">
                {"Occasional"}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regular" id="alcohol-regular" />
              <Label htmlFor="alcohol-regular" className="font-normal cursor-pointer">
                {"Regular"}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">{"Height (cm)"}</Label>
          <Input
            id="height"
            type="number"
            placeholder="170"
            min={100}
            max={250}
            value={formData.height || ""}
            onChange={(e) => setFormData({ ...formData, height: Number.parseInt(e.target.value) || null })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">{"Weight (kg)"}</Label>
          <Input
            id="weight"
            type="number"
            placeholder="70"
            min={30}
            max={300}
            value={formData.weight || ""}
            onChange={(e) => setFormData({ ...formData, weight: Number.parseInt(e.target.value) || null })}
            required
          />
        </div>
      </div>

      {bmi && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            {"Your BMI: "}
            <span className="text-lg font-bold text-primary">{bmi}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal weight" : bmi < 30 ? "Overweight" : "Obese"}
          </p>
        </div>
      )}

      {showWarning && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {
              "Based on your health profile, you may have longer waiting periods or higher premiums. We'll find the best options for you."
            }
          </AlertDescription>
        </Alert>
      )}

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
