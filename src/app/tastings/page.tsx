import { Metadata } from 'next'

import { HeadingSection, Tastings } from '@/app/tastings/components'

export const metadata: Metadata = {
  title: 'Tastings', // TODO: Change this to template
  description: 'Discover our wine tasting packages'
}

export default function TastingListPage() {
  return (
    <>
      <HeadingSection
        title="Tastings"
        description="Discover our wine tasting packages"
      />
      <Tastings />
    </>
  )
}
