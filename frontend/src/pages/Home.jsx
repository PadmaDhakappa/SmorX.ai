import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'

// Lazy-load below-the-fold sections for performance
const AIServicesSection = lazy(() => import('../sections/AIServicesSection'))
const IndustriesSection = lazy(() => import('../sections/IndustriesSection'))
const SuccessStoriesSection = lazy(() => import('../sections/SuccessStoriesSection'))
const About = lazy(() => import('../sections/About'))
const Trust = lazy(() => import('../sections/Trust'))
const Contact = lazy(() => import('../sections/Contact'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-label="Loading section" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AIServicesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <IndustriesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SuccessStoriesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Trust />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
