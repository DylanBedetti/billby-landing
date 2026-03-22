import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
    </div>
  )
}

export default App
