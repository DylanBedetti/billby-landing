import { useEffect } from 'react'
import { NavBar } from '@/components/sections/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { ValueCalculatorSection } from '@/components/sections/ValueCalculatorSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTABand } from '@/components/sections/CTABand'
import { Footer } from '@/components/sections/Footer'

function App() {
  // Deep links like /#value-calculator land at the top on a cold load because
  // the browser resolves the hash before React renders the target. Scroll to it
  // once mounted (and again shortly after, once late layout shifts settle).
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const scrollToTarget = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
    scrollToTarget()
    const timer = setTimeout(scrollToTarget, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <ValueCalculatorSection />
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
