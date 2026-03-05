"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"
import { api, setAuthData } from "@/lib/api/client"
import { getDashboardPath } from "@/lib/auth/roles"
import { useRouter } from "next/navigation"

interface OtpLoginFormProps {
  loginType: "customer" | "admin" | "superadmin"
  title: string
  subtitle: string
}

export default function OtpLoginForm({
  loginType,
  title,
  subtitle,
}: OtpLoginFormProps) {
  const router = useRouter()
  const [step, setStep] = useState<"mobile" | "otp">("mobile")
  const [mobileNumber, setMobileNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (mobileNumber.length !== 10) {
      setError("Enter valid 10-digit mobile number")
      return
    }

    try {
      setIsLoading(true)
      const res = await api("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone: mobileNumber }),
      })

      if (res.message) {
        setStep("otp")
        setTimer(30)
        const interval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (otp.length !== 6) {
      setError("Enter complete 6-digit OTP")
      return
    }

    try {
      setIsLoading(true)
      const res = await api("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          phone: mobileNumber,
          code: otp,
          loginType,
        }),
      })

      if (!res.accessToken) {
        setError(res.message || "Invalid OTP")
        return
      }

      // Store auth data
      setAuthData({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        role: res.role || res.user?.role,
        userId: res.user?.id,
      })

      const role = res.role || res.user?.role

      // Route based on role
      if (role === "CUSTOMER") {
        if (res.onboardingCompleted) {
          router.push("/dashboard")
        } else {
          router.push("/onboarding")
        }
      } else {
        router.push(getDashboardPath(role))
      }
    } catch (err: any) {
      setError(err.message || "OTP verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setTimer(30)
    setError("")
    try {
      await api("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone: mobileNumber }),
      })
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP")
    }
  }

  return (
    <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl border-2">
      {step === "mobile" ? (
        <form onSubmit={handleMobileSubmit} className="space-y-5">
          <div className="space-y-2 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm sm:text-base">
              Mobile Number
            </Label>
            <div className="flex gap-2">
              <div className="flex items-center justify-center px-3 py-2 border rounded-md bg-muted text-sm sm:text-base">
                +91
              </div>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit number"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(e.target.value.replace(/\D/g, ""))
                }
                maxLength={10}
                className="text-sm sm:text-base"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Sending OTP..." : "Continue with OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-5">
          <div className="space-y-2 text-center">
            <h2 className="text-xl sm:text-2xl font-bold">Verify OTP</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {"We've sent a 6-digit code to"}
              <br />
              <span className="font-medium text-foreground">
                +91 {mobileNumber}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm sm:text-base">
              Enter OTP
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />
            {error && (
              <p className="text-sm text-destructive text-center">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 sm:h-11 text-sm sm:text-base"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setStep("mobile")
                setOtp("")
                setError("")
              }}
              className="text-primary hover:underline"
            >
              Change Number
            </button>
            <span className="mx-2 text-muted-foreground">
              {"  |  "}
            </span>
            {timer > 0 ? (
              <span className="text-muted-foreground inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Resend OTP in {timer}s
              </span>
            ) : (
              <Button
                variant="link"
                type="button"
                onClick={handleResendOtp}
                className="h-auto p-0"
              >
                Resend OTP
              </Button>
            )}
          </div>
        </form>
      )}
    </Card>
  )
}
