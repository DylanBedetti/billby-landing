import { NavBar } from '@/components/sections/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABand } from '@/components/sections/CTABand'
import { Footer } from '@/components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <FAQSection />
        <CTABand />
        <Footer />
      </div>
    </div>
  )
}

export default App
