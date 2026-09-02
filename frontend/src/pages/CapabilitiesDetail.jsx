import CategoryDetail from '../components/templates/CategoryDetail'
import { CAPABILITIES_ITEMS } from '../data/capabilities'

export default function CapabilitiesDetail() {
  return (
    <CategoryDetail
      items={CAPABILITIES_ITEMS}
      basePath="/capabilities"
      spaceLabel="Capabilities"
      spaceHref="/capabilities"
      seoSuffix="SmorX Capabilities"
    />
  )
}
