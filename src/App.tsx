import { useState } from 'react'
import { LoadingSplash } from './components/LoadingSplash'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { TrustBand } from './components/TrustBand'
import { StorySection } from './components/StorySection'
import { ProductShowcase } from './components/ProductShowcase'
import { CompareFrames } from './components/CompareFrames'
import { TrustStrip } from './components/TrustStrip'
import { Testimonials } from './components/Testimonials'
import { About } from './components/About'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { LiveTicker } from './components/LiveTicker'

function App() {
  const [ready, setReady] = useState(false)

  return (
    <div className="min-h-screen bg-rcb-bg text-rcb-text">
      <a href="#main" className="skip-link">Skip to content</a>

      {!ready && <LoadingSplash onDone={() => setReady(true)} />}

      <Navbar />
      <main id="main" className={ready ? 'opacity-100 transition-opacity duration-500' : 'opacity-0'}>
        <Hero />
        <Marquee />
        <TrustBand />
        <StorySection />
        <ProductShowcase />
        <CompareFrames />
        <Testimonials />
        <TrustStrip />
        <About />
        <Faq />
        <Footer />
      </main>

      {/* Floating widgets — only mount after splash has finished. */}
      {ready && <LiveTicker />}
    </div>
  )
}

export default App
