import CategoryDetail from '../components/templates/CategoryDetail'
import { HIRE_ROLE_ITEMS } from '../data/hireTalent'

export default function HireRoleDetail() {
  return (
    <CategoryDetail
      items={HIRE_ROLE_ITEMS}
      basePath="/hire-talent"
      spaceLabel="Hire Talent"
      spaceHref="/hire-talent"
      seoSuffix="Hire Talent"
    />
  )
}
