"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Shield, Users } from "lucide-react"
import OtpLoginForm from "./otp-login-form"
import pixelLogo from "../../public/images/pixel-insure-logo.png"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container max-w-7xl mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={pixelLogo}
              alt="PixelInsure"
              width={180}
              height={36}
              className="h-7 w-auto sm:h-9"
              priority
            />
          </Link>
          <div className="flex-1" />
          <Badge variant="outline" className="gap-1.5 px-3 py-1">
            <Users className="w-3.5 h-3.5" />
            Admin Portal
          </Badge>
        </div>
      </header>

      <section className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <Badge variant="secondary">Admin Access</Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                Admin Dashboard
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-lg">
                Manage your assigned customers, view profiles, and create new customer accounts from your admin panel.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Customer Management</p>
                  <p className="text-sm text-muted-foreground">
                    View and manage assigned customer profiles
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Permission-Based Access</p>
                  <p className="text-sm text-muted-foreground">
                    Access features based on permissions granted by SuperAdmin
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <OtpLoginForm
              loginType="admin"
              title="Admin Login"
              subtitle="Enter your registered admin mobile number"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
