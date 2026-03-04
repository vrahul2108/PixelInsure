"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock } from "lucide-react"
import OtpLoginForm from "./otp-login-form"
import pixelLogo from "../../public/images/pixel-insure-logo.png"

export default function SuperAdminLoginPage() {
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
          <Badge variant="outline" className="gap-1.5 px-3 py-1 border-destructive/50 text-destructive">
            <Lock className="w-3.5 h-3.5" />
            SuperAdmin Portal
          </Badge>
        </div>
      </header>

      <section className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-destructive" />
                </div>
                <Badge variant="destructive">SuperAdmin Access</Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                SuperAdmin Control Panel
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-lg">
                Full administrative control over the platform. Manage admins, set permissions, and oversee all operations.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Admin Management</p>
                  <p className="text-sm text-muted-foreground">
                    Create, update, and deactivate admin accounts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Permission Control</p>
                  <p className="text-sm text-muted-foreground">
                    Grant and revoke admin permissions granularly
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <OtpLoginForm
              loginType="superadmin"
              title="SuperAdmin Login"
              subtitle="Enter your registered SuperAdmin mobile number"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
