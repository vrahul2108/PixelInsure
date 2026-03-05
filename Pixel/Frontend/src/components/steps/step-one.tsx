"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { OnboardingData } from "../onboarding/onboarding-flow"
import { ArrowRight, ArrowLeft, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StepOneProps {
  data: OnboardingData
  onNext: (data: Partial<OnboardingData>) => void
  onBack: () => void
}

/* ===============================
   ✅ STRONG FORM TYPE
================================ */
interface StepOneFormData {
  spouseAge: number | null
  childrenAges: number[]
  parentsAges: number[]
  parentsFinanciallyDependent: boolean | null
  childrenPlannedIn3To5Years: boolean | null
  city: string
}

export default function StepOne({ data, onNext, onBack }: StepOneProps) {
  /* ===============================
     ✅ TYPED STATE
  ================================= */
  const [formData, setFormData] = useState<StepOneFormData>({
    spouseAge: data.spouseAge ?? null,
    childrenAges: data.childrenAges ?? [],
    parentsAges: data.parentsAges ?? [],
    parentsFinanciallyDependent: data.parentsFinanciallyDependent ?? null,
    childrenPlannedIn3To5Years: data.childrenPlannedIn3To5Years ?? null,
    city: data.city ?? "",
  })

  const [childAge, setChildAge] = useState<string>("")
  const [parentAge, setParentAge] = useState<string>("")

  /* ===============================
     CITY TIER DETECTION
  ================================= */
  const detectCityTier = (city: string): "metro" | "non-metro" => {
    const metroCities = [
      "mumbai",
      "delhi",
      "bangalore",
      "hyderabad",
      "chennai",
      "kolkata",
      "pune",
      "ahmedabad",
    ]

    return metroCities.some((metro) =>
      city.toLowerCase().includes(metro)
    )
      ? "metro"
      : "non-metro"
  }

  /* ===============================
     CHILD HANDLERS
  ================================= */
  const addChild = () => {
    const age = Number.parseInt(childAge)

    if (!isNaN(age) && age > 0) {
      setFormData((prev) => ({
        ...prev,
        childrenAges: [...prev.childrenAges, age],
      }))
      setChildAge("")
    }
  }

  const removeChild = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      childrenAges: prev.childrenAges.filter((_, i) => i !== index),
    }))
  }

  /* ===============================
     PARENT HANDLERS
  ================================= */
  const addParent = () => {
    const age = Number.parseInt(parentAge)

    if (!isNaN(age) && age > 0) {
      setFormData((prev) => ({
        ...prev,
        parentsAges: [...prev.parentsAges, age],
      }))
      setParentAge("")
    }
  }

  const removeParent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      parentsAges: prev.parentsAges.filter((_, i) => i !== index),
    }))
  }

  /* ===============================
     SUBMIT
  ================================= */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const cityTier = detectCityTier(formData.city)

    onNext({
      ...formData,
      cityTier,
    })
  }

  const isMarried = data.maritalStatus === "married"
  const isValid = formData.city.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isMarried && (
        <div className="space-y-2">
          <Label htmlFor="spouseAge">Spouse Age (Optional)</Label>
          <Input
            id="spouseAge"
            type="number"
            min={18}
            max={100}
            placeholder="Spouse's age"
            value={formData.spouseAge ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                spouseAge:
                  e.target.value === ""
                    ? null
                    : Number.parseInt(e.target.value),
              }))
            }
          />
        </div>
      )}

      {/* CHILDREN */}
      <div className="space-y-2">
        <Label>Children Ages (Optional)</Label>

        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            max={30}
            placeholder="Add child's age"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addChild()
              }
            }}
          />
          <Button type="button" onClick={addChild} size="icon" variant="secondary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.childrenAges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.childrenAges.map((age, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {age} years
                <button
                  type="button"
                  onClick={() => removeChild(index)}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* PARENTS */}
      <div className="space-y-2">
        <Label>Parents Ages (Optional)</Label>

        <div className="flex gap-2">
          <Input
            type="number"
            min={40}
            max={100}
            placeholder="Add parent's age"
            value={parentAge}
            onChange={(e) => setParentAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addParent()
              }
            }}
          />
          <Button type="button" onClick={addParent} size="icon" variant="secondary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.parentsAges.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.parentsAges.map((age, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                {age} years
                <button
                  type="button"
                  onClick={() => removeParent(index)}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* PARENTS DEPENDENT */}
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <Label htmlFor="parents-dependent" className="cursor-pointer">
          Parents financially dependent?
        </Label>
        <Switch
          id="parents-dependent"
          checked={formData.parentsFinanciallyDependent === true}
          onCheckedChange={(checked: boolean) =>
            setFormData((prev) => ({
              ...prev,
              parentsFinanciallyDependent: checked,
            }))
          }
        />
      </div>

      {/* CHILDREN PLANNED */}
      <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
        <Label htmlFor="children-planned" className="cursor-pointer">
          Children planning in next 3–5 years?
        </Label>
        <Switch
          id="children-planned"
          checked={formData.childrenPlannedIn3To5Years === true}
          onCheckedChange={(checked: boolean) =>
            setFormData((prev) => ({
              ...prev,
              childrenPlannedIn3To5Years: checked,
            }))
          }
        />
      </div>

      {/* CITY */}
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
          required
        />
        <p className="text-xs text-muted-foreground">
          This helps us determine applicable healthcare facilities
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          size="lg"
          className="gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button type="submit" disabled={!isValid} size="lg" className="gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}