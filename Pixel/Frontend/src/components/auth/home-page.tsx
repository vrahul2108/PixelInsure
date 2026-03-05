"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Lock, Users, TrendingUp, FileCheck, BarChart3, Brain } from "lucide-react"
import pixelLogo from "../../public/images/pixel-insure-logo.png"
import hdfcLife from "../../public/images/partners/hdfc-life.png"
import hdfcErgo from "../../public/images/partners/hdfc-ergo.png"
import axisMax from "../../public/images/partners/axis-max-life.png"
import tataAig from "../../public/images/partners/tata-aig.png"
import SBILife from "../../public/images/partners/sbi-life.png"
import StarHealth from "../../public/images/partners/star-health.png"
import ICICI from "../../public/images/partners/icici-lombard.png"
import Kotak from "../../public/images/partners/kotak-life.png"
import tataAIA from "../../public/images/partners/tata-aia-life.png"
import ICICIPred from "../../public/images/partners/icici-prudential.png"
import OtpLoginForm from "./otp-login-form"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur `supports-[backdrop-filter]:bg-background/60`">
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
          <Badge variant="outline" className="hidden sm:inline-flex gap-1.5 px-3 py-1">
            <Shield className="w-3.5 h-3.5" />
            IRDAI-compliant platform
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Left: Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance max-w-2xl leading-tight">
                Get the Right Health & Life <br className="hidden lg:block" />
                Insurance — Tailored for You
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty">
                PixelInsure uses your life stage, income, and family needs to recommend insurance that actually fits you
                — not generic plans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Personalized recommendations</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Based on your unique needs</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm sm:text-base">No spam. No forced calls</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Privacy-first approach</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Transparent commissions</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Clear pricing always</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Data secured & encrypted</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Bank-grade security</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: OTP Card */}
          <div className="flex justify-center lg:justify-end mt-4 lg:mt-0">
            <OtpLoginForm
              loginType="customer"
              title="Get Started"
              subtitle="Enter your mobile number to continue"
            />
          </div>
        </div>
      </section>

      {/* Smart Product Analysis & Recommendations Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-8 sm:py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Why Choose PixelInsure</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              AI-powered analysis to find the perfect insurance plan tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Budget Optimization</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Find the best coverage within your budget with our smart recommendation engine
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm0 0V4a4 4 0 00-4 4H4a4 4 0 004 4zm0 0v9m0-9H4m0 0v9m6-9a4 4 0 118 0 4 4 0 01-8 0zm0 0V4a4 4 0 00-4 4H4a4 4 0 004 4zm0 0v9"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Personalized Matching</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Policies matched to your life stage, family needs, and financial goals
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Coverage Gap Analysis</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Identify protection gaps and get recommendations to secure your family's future
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-100 flex items-center justify-center mb-3 sm:mb-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Real-time Comparison</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Compare plans from 10+ insurers instantly with transparent pricing and benefits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Analysis Features */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
            Smart Product Analysis & Recommendations
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Our AI-driven engine analyzes 50+ data points to recommend the best insurance plans for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Analysis Criteria */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Age Eligibility Matching</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    We filter plans based on your exact age to ensure you're eligible and get the best rates for your
                    age group.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Premium Affordability Analysis</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Plans are suggested within your declared budget, ensuring you never feel financially stretched.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Coverage Adequacy Check</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    We compare your current and required coverage to identify gaps and recommend suitable top-ups or
                    enhancements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Claim Settlement Scoring</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Insurers are ranked based on claim settlement ratios, customer reviews, and grievance handling to
                    ensure reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-100 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">Risk-Based Recommendations</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Based on your health profile, lifestyle, and family medical history, we tailor policy features like
                    critical illness riders or maternity coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="flex items-center justify-center mt-4 lg:mt-0">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-2xl w-full max-w-md">
              <div className="space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Powered by Real Results</h3>
                  <p className="text-sm sm:text-base text-white/90">See how our AI-driven analysis performs</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">3x Faster</div>
                    <p className="text-sm sm:text-base text-white/90">
                      Get recommendations in under 3 minutes vs traditional 10+ minute consultations
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">95%+ Accuracy</div>
                    <p className="text-sm sm:text-base text-white/90">
                      AI matches your needs with 95%+ precision based on validated customer feedback
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">20+ Insurers</div>
                    <p className="text-sm sm:text-base text-white/90">
                      Compare plans from India's top life and health insurance companies
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-5">
                    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">₹15K+ Saved</div>
                    <p className="text-sm sm:text-base text-white/90">
                      Average annual savings per customer through optimized plan selection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners Section */}
      <section className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Our Insurance Partners</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Trusted by millions of Indians</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center">
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={hdfcLife}
              alt="HDFC Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={ICICIPred}
              alt="ICICI Prudential Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={axisMax}
              alt="Axis Max Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={tataAIA}
              alt="Tata AIA Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={SBILife}
              alt="SBI Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={StarHealth}
              alt="Star Health Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={hdfcErgo}
              alt="HDFC Ergo"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={ICICI}
              alt="ICICI Lombard"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={tataAig}
              alt="Tata AIG"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
          <div className="flex items-center justify-center w-full h-16 sm:h-20 px-2 sm:px-4 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
            <Image
              src={Kotak}
              alt="Kotak Life Insurance"
              width={160}
              height={60}
              className="w-auto h-10 sm:h-12 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Why PixelInsure Section */}
      <section className="bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">What Makes Us Different</h2>
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Insurance planning made transparent, personalized, and hassle-free
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-6 space-y-2 sm:space-y-3 border-2 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">AI-Driven Recommendations</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Insurance based on your real needs, not commissions.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 space-y-2 sm:space-y-3 border-2 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">Life-Stage Based Planning</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Young professionals, families, parents, retirees — all covered.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 space-y-2 sm:space-y-3 border-2 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">No Mis-selling Promise</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Clear explanation of why a plan is recommended.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 space-y-2 sm:space-y-3 border-2 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">Partnered with Leading Insurers</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Trusted, regulated, claim-proven companies.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Data & Compliance Section */}
      <section className="bg-muted/30 py-8 sm:py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Your data is safe with us</h3>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              PixelInsure follows industry-grade security standards. Your information is used only to generate
              personalized insurance recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                We never sell your data
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                End-to-end encryption
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />
                IRDAI-compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <p className="text-center sm:text-left">&copy; 2025 PixelInsure. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/irdai" className="hover:text-foreground transition-colors">
                IRDAI Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
