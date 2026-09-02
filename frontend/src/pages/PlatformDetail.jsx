import CategoryDetail from '../components/templates/CategoryDetail'
import { PLATFORM_ITEMS } from '../data/platform'

export default function PlatformDetail() {
  return (
    <CategoryDetail
      items={PLATFORM_ITEMS}
      basePath="/platform"
      spaceLabel="Platform"
      spaceHref="/platform"
      seoSuffix="SmorX Platform"
    />
  )
}
