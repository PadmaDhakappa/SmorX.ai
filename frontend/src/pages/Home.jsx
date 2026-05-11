import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'

const ControlPlane = lazy(() => import('../sections/ControlPlane'))
const AIServicesSection = lazy(() => import('../sections/AIServicesSection'))
const IndustriesSection = lazy(() => import('../sections/IndustriesSection'))
const AgentMarketplace = lazy(() => import('../sections/AgentMarketplace'))
const ImpactSection = lazy(() => import('../sections/ImpactSection'))
const SuccessStoriesSection = lazy(() => import('../sections/SuccessStoriesSection'))
const BlogSection = lazy(() => import('../sections/BlogSection'))
const Trust = lazy(() => import('../sections/Trust'))
const Contact = lazy(() => import('../sections/Contact'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-24" style={{ background: '#060A12' }}>
      <div className="w-8 h-8 rounded-full border-2 border-violet-500/40 border-t-violet-500 animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Suspense fallback={<SectionLoader />}>
          <ControlPlane />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AIServicesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <IndustriesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AgentMarketplace />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ImpactSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SuccessStoriesSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <BlogSection />
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
