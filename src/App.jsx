import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import SelectedWork from './sections/SelectedWork'
import StudioIntro from './sections/StudioIntro'
import Services from './sections/Services'
import BehindTheLens from './sections/BehindTheLens'
import ProductionProcess from './sections/ProductionProcess'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import { useLenis } from './hooks/useLenis'

function App() {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis()

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-ink selection:text-paper">
      {/* 1. Primary Editorial Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* 2. Cinematic Hero Section */}
        <Hero />

        {/* 3. Selected Work Portfolio */}
        <SelectedWork />

        {/* 4. Studio Introduction */}
        <StudioIntro />

        {/* 5. Services */}
        <Services />

        {/* 6. Behind the Lens */}
        <BehindTheLens />

        {/* 7. Production Process */}
        <ProductionProcess />

        {/* 8. Contact Section */}
        <Contact />
      </main>

      {/* 9. Editorial Studio Footer */}
      <Footer />
    </div>
  )
}

export default App
