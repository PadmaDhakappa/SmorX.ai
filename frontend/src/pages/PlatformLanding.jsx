import CategoryLanding from '../components/templates/CategoryLanding'
import { PLATFORM_ITEMS } from '../data/platform'

export default function PlatformLanding() {
  return (
    <CategoryLanding
      seoTitle="Platform — The AI Control Plane Behind Every Agent"
      seoDescription="Orchestrator core, specialized agents, data layer, governance, integrations, and observability — the six layers that make up SmorX's AI control plane."
      canonical="/platform"
      eyebrow="Platform"
      headline='The <span class="gradient-text">Control Plane</span> Behind Every Agent'
      subhead="Six layers work together to turn a single agent into a governed, observable system — not a black box you hope keeps working."
      groups={[{ items: PLATFORM_ITEMS, cols: 3 }]}
      basePath="/platform"
      spaceLabel="Platform"
    />
  )
}
