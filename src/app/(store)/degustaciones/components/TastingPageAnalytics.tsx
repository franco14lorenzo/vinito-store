'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

type Tasting = {
  id: number
  name: string
  short_description: string | null
  slug: string
  image: string | null
  wines: {
    id: number
  }[]
  stock: number
}

interface TastingPageAnalyticsProps {
  tastings: Tasting[]
}

export function TastingPageAnalytics({ tastings }: TastingPageAnalyticsProps) {
  useEffect(() => {
    posthog.capture('Product List Viewed', {
      products: tastings.map((tasting) => ({
        id: tasting.id,
        name: tasting.name,
        category: 'Degustaciones',
        slug: tasting.slug
      }))
    })
  }, [tastings])

  return null
}
