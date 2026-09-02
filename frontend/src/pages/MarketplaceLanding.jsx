import CategoryLanding from '../components/templates/CategoryLanding'
import { MARKETPLACE_ITEMS } from '../data/agentMarketplaceCatalog'

export default function MarketplaceLanding() {
  return (
    <CategoryLanding
      seoTitle="Agent Marketplace — Pre-Built AI Agents for Enterprise Workflows"
      seoDescription="Voice AI, IT operations, sales intelligence, healthcare support, data analyst, and security monitoring agents — pre-trained and ready to deploy in days."
      canonical="/agent-marketplace"
      eyebrow="Agent Marketplace"
      headline='Pre-Built AI Agents for <span class="gradient-text">Enterprise Workflows</span>'
      subhead="Deploy purpose-built agents in days, not months. Each agent is pre-trained on domain knowledge and integrates with your existing stack."
      groups={[{ items: MARKETPLACE_ITEMS, cols: 3 }]}
      basePath="/agent-marketplace"
      spaceLabel="Agent Marketplace"
    />
  )
}
