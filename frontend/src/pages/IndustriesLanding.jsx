import CategoryLanding from '../components/templates/CategoryLanding'
import { INDUSTRY_ITEMS } from '../data/industries'

export default function IndustriesLanding() {
  return (
    <CategoryLanding
      seoTitle="Solutions by Industry — AI Systems Built for Your Sector"
      seoDescription="Healthcare, manufacturing, financial services, logistics, energy, automotive, security, and SaaS — AI systems built for the data, compliance, and operational realities of each sector."
      canonical="/industries"
      eyebrow="Solutions by Industry"
      headline='Built for the Realities of <span class="gradient-text">Your Sector</span>'
      subhead="Every industry has unique data, compliance, and operational constraints. Our AI systems are built for yours, not retrofitted from a generic template."
      groups={[{ items: INDUSTRY_ITEMS, cols: 4 }]}
      basePath="/industries"
      spaceLabel="Solutions by Industry"
    />
  )
}
