import CategoryDetail from '../components/templates/CategoryDetail'
import { INDUSTRY_ITEMS } from '../data/industries'

export default function IndustriesDetail() {
  return (
    <CategoryDetail
      items={INDUSTRY_ITEMS}
      basePath="/industries"
      spaceLabel="Solutions by Industry"
      spaceHref="/industries"
      seoSuffix="Industry Solutions"
    />
  )
}
