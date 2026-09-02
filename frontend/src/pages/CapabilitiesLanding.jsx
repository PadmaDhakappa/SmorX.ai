import CategoryLanding from '../components/templates/CategoryLanding'
import { CAPABILITIES_ITEMS } from '../data/capabilities'

export default function CapabilitiesLanding() {
  return (
    <CategoryLanding
      seoTitle="Capabilities — What SmorX Builds for Enterprise Teams"
      seoDescription="Agentic workflow automation, multi-agent systems, AI data intelligence, autonomous software engineering, AI security, and custom agent development."
      canonical="/capabilities"
      eyebrow="Capabilities"
      headline='Six Ways to Turn Manual Work Into <span class="gradient-text">Autonomous Outcomes</span>'
      subhead="Every capability is designed to integrate with your existing systems, scale with your operations, and deliver measurable ROI."
      groups={[{ items: CAPABILITIES_ITEMS, cols: 3 }]}
      basePath="/capabilities"
      spaceLabel="Capabilities"
    />
  )
}
