import CategoryLanding from '../components/templates/CategoryLanding'
import { RESULTS_ITEMS } from '../data/results'

export default function ResultsLanding() {
  return (
    <CategoryLanding
      seoTitle="Results — Real Deployments, Real Numbers"
      seoDescription="Impact and ROI metrics, deployment timeline, case studies, and client testimonials from live enterprise AI agent deployments."
      canonical="/results"
      eyebrow="Results"
      headline='Real Deployments, <span class="gradient-text">Real Numbers</span>'
      subhead="Cost, speed, and adoption metrics from live enterprise systems — not projections from before a system ever shipped."
      groups={[{ items: RESULTS_ITEMS, cols: 4 }]}
      basePath="/results"
      spaceLabel="Results"
    />
  )
}
