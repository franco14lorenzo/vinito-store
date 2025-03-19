'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

export function HomePageAnalytics() {
  const posthog = usePostHog()
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('has_visited_ecommerce')

    if (!hasVisitedBefore) {
      posthog.capture('First Time Visit', {
        timestamp: new Date().toISOString()
      })

      localStorage.setItem('has_visited_ecommerce', 'true')
    }

    posthog.capture('Home Page Viewed')
  }, [posthog])

  return null
}
