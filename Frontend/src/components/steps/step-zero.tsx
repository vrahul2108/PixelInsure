"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OnboardingData, Persona } from "../onboarding/onboarding-flow"
import { ArrowRight } from "lucide-react"

interface StepZeroProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
}

export default function StepZero({ data, onNext }: StepZeroProps) {
  const [formData, setFormData] = useState({
    name: data.name || "",
    gender: data.gender || null,
    age: data.age || null,
    maritalStatus: data.maritalStatus || null,
    dependents: data.dependents || null,
    annualIncome: data.annualIncome || "",
    employmentType: data.employmentType || "",
    educationLevel: data.educationLevel || null,
  })

  const detectPersona = (): Persona => {
    const age = formData.age || 0
    const dependents = formData.dependents || 0
    const isMarried = formData.maritalStatus === "married"
    const income = Number.parseInt(formData.annualIncome.replace(/[^0-9]/g, "")) || 0

    // Young Guardian
    if (age < 32 && dependents <= 1) {
      return "Young Guardian"
    }
    // Family Protector
    if (isMarried && dependents > 0 && age >= 30 && age <= 45) {
      return "Family Protector"
    }
    // Goal-Oriented Parent
    if (dependents > 0 && age >= 35 && age <= 50) {
      return "Goal-Oriented Parent"
    }
    // Wealth Accumulator
    if (income > 4000000 && age >= 40 && age <= 55) {
      return "Wealth Accumulator"
    }
    // Retirement Planner
    if (age > 55) {
      return "Retirement Planner"
    }

    return "Young Guardian" // Default
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const persona = detectPersona()
    onNext({
      ...formData,
      persona,
    })
  }

  const isValid =
    formData.name &&
    formData.gender &&
    formData.age &&
    formData.maritalStatus &&
    formData.dependents !== null &&
    formData.annualIncome &&
    formData.employmentType &&
    formData.educationLevel

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm sm:text-base">
          {"Full Name"}
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="text-sm sm:text-base"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm sm:text-base">
            {"Gender"}
          </Label>
          <Select
            value={formData.gender || ""}
            onValueChange={(value) => setFormData({ ...formData, gender: value as OnboardingData["gender"] })}
          >
            <SelectTrigger id="gender" className="text-sm sm:text-base">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm sm:text-base">
            {"Age"}
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Your age"
            min={18}
            max={100}
            value={formData.age || ""}
            onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || null })}
            className="text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus" className="text-sm sm:text-base">
            {"Marital Status"}
          </Label>
          <Select
            value={formData.maritalStatus || ""}
            onValueChange={(value) =>
              setFormData({ ...formData, maritalStatus: value as OnboardingData["maritalStatus"] })
            }
          >
            <SelectTrigger id="maritalStatus" className="text-sm sm:text-base">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dependents" className="text-sm sm:text-base">
            {"Number of Dependents"}
          </Label>
          <Input
            id="dependents"
            type="number"
            placeholder="0"
            min={0}
            max={10}
            value={formData.dependents ?? ""}
            onChange={(e) => setFormData({ ...formData, dependents: Number.parseInt(e.target.value) || 0 })}
            className="text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="annualIncome" className="text-sm sm:text-base">
            {"Annual Income Range"}
          </Label>
          <Select
            value={formData.annualIncome}
            onValueChange={(value) => setFormData({ ...formData, annualIncome: value })}
          >
            <SelectTrigger id="annualIncome" className="text-sm sm:text-base">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-5L">{"₹0 - 5 Lakhs"}</SelectItem>
              <SelectItem value="5-10L">{"₹5 - 10 Lakhs"}</SelectItem>
              <SelectItem value="10-20L">{"₹10 - 20 Lakhs"}</SelectItem>
              <SelectItem value="20-40L">{"₹20 - 40 Lakhs"}</SelectItem>
              <SelectItem value="40L+">{"₹40 Lakhs+"}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employmentType" className="text-sm sm:text-base">
            {"Employment Type"}
          </Label>
          <Select
            value={formData.employmentType}
            onValueChange={(value) => setFormData({ ...formData, employmentType: value })}
          >
            <SelectTrigger id="employmentType" className="text-sm sm:text-base">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried">Salaried</SelectItem>
              <SelectItem value="self-employed">Self Employed</SelectItem>
              <SelectItem value="business">Business Owner</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="educationLevel" className="text-sm sm:text-base">
            {"Education Level"}
          </Label>
          <Select
            value={formData.educationLevel || ""}
            onValueChange={(value) => setFormData({ ...formData, educationLevel: value })}
          >
            <SelectTrigger id="educationLevel" className="text-sm sm:text-base">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="post-graduate">Post Graduate</SelectItem>
              <SelectItem value="doctorate">Doctorate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-2 sm:pt-4">
        <Button type="submit" disabled={!isValid} size="lg" className="gap-2 h-10 sm:h-11 text-sm sm:text-base">
          {"Continue"}
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </form>
  )
}
