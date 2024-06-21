'use client'

import { ReactNode, Suspense } from 'react'

import { AccommodationProvider } from '@/app/contexts/accommodation'

export function AccommodationSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccommodationProvider>{children}</AccommodationProvider>
    </Suspense>
  )
}
