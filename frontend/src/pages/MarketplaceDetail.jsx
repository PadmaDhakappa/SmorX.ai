import CategoryDetail from '../components/templates/CategoryDetail'
import { MARKETPLACE_ITEMS } from '../data/agentMarketplaceCatalog'

export default function MarketplaceDetail() {
  return (
    <CategoryDetail
      items={MARKETPLACE_ITEMS}
      basePath="/agent-marketplace"
      spaceLabel="Agent Marketplace"
      spaceHref="/agent-marketplace"
      seoSuffix="Agent Marketplace"
    />
  )
}
