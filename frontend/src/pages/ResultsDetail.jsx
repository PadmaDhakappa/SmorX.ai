import CategoryDetail from '../components/templates/CategoryDetail'
import { RESULTS_ITEMS } from '../data/results'

export default function ResultsDetail() {
  return (
    <CategoryDetail
      items={RESULTS_ITEMS}
      basePath="/results"
      spaceLabel="Results"
      spaceHref="/results"
      seoSuffix="SmorX Results"
    />
  )
}
