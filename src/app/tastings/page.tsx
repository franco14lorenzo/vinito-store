import { Metadata } from 'next'

import { HeadingSection, Tastings } from '@/app/tastings/components'
import Breadcrumbs from '@/components/blocks/breadcrumbs'

export const metadata: Metadata = {
  title: 'Tastings',
  description: 'Discover our wine tasting packages'
}

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Tastings', isCurrentPage: true }
]

export default function TastingListPage() {
  return (
    <>
      <Breadcrumbs elements={breadcrumbs} />
      <HeadingSection
        title="Tastings"
        description="Discover our wine tasting packages"
      />
      <Tastings />
    </>
  )
}
