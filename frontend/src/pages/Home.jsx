import { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import SEO from '../components/SEO'

const ControlPlane = lazy(() => import('../sections/ControlPlane'))
const AIServicesSection = lazy(() => import('../sections/AIServicesSection'))
const IndustriesSection = lazy(() => import('../sections/IndustriesSection'))
const AgentMarketplace = lazy(() => import('../sections/AgentMarketplace'))
const ImpactSection = lazy(() => import('../sections/ImpactSection'))
const SuccessStoriesSection = lazy(() => import('../sections/SuccessStoriesSection'))
const BlogSection = lazy(() => import('../sections/BlogSection'))
const Trust = lazy(() => import('../sections/Trust'))
const Contact = lazy(() => import('../sections/Contact'))

const HOME_WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://smorx.ai/#webpage',
  url: 'https://smorx.ai/',
  name: 'Enterprise AI Automation Platform & AI Agent Infrastructure | SmorX.ai',
  description:
    'SmorX.ai builds enterprise AI automation platforms, AI agents, multi-agent workflows, and intelligent decision infrastructure for modern enterprises.',
  isPartOf: { '@id': 'https://smorx.ai/#website' },
  about: { '@id': 'https://smorx.ai/#organization' },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: 'https://smorx.ai/og-image.png',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://smorx.ai/',
      },
    ],
  },
}

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
      <SEO
        title="Enterprise AI Automation Platform & AI Agent Infrastructure"
        description="SmorX.ai builds enterprise AI automation platforms, AI agents, multi-agent workflows, and intelligent decision infrastructure for modern enterprises."
        canonical="/"
        extraSchema={HOME_WEBPAGE_SCHEMA}
      />
      <Navbar />
      <main id="main-content">
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
