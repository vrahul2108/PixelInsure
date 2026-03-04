import OnboardingFlow from "@/components/onboarding/onboarding-flow"
import SiteHeader from "../../components/layout/site-header"

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <OnboardingFlow />
    </main>
  )
}
