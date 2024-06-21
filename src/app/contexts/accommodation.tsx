'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

interface Accommodation {
  id: string
  name: string
  address: string
}

type AccommodationContextType = [
  accommodation: Accommodation | undefined,
  setAccommodation: (accommodation: Accommodation) => void
]

const AccommodationContext = createContext<
  AccommodationContextType | undefined
>(undefined)

export function AccommodationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const accommodationId = searchParams.get('accommodation_id')

  const [accommodation, setAccommodation] = useState<Accommodation | undefined>(
    () => {
      if (typeof window !== 'undefined') {
        const accommodationSaved = localStorage.getItem('accommodation')

        // Attempt to parse the saved accommodation if it exists
        return accommodationSaved && accommodationSaved !== 'undefined'
          ? JSON.parse(accommodationSaved)
          : undefined
      }
      return undefined
    }
  )

  useEffect(() => {
    if (accommodation) {
      localStorage.setItem('accommodation', JSON.stringify(accommodation))
    }
  }, [accommodation])

  useEffect(() => {
    if (accommodationId === '0') {
      setAccommodation(undefined)
      return
    }

    if (accommodationId) {
      // TODO: Fetch accommodation from API
      const mockAccommodation: Accommodation = {
        id: accommodationId,
        name: 'Hotel California',
        address: '1234 California St, California, CA'
      }
      setAccommodation(mockAccommodation)
    }
  }, [accommodationId])

  return (
    <AccommodationContext.Provider value={[accommodation, setAccommodation]}>
      {children}
    </AccommodationContext.Provider>
  )
}

export function useAccommodation() {
  const context = useContext(AccommodationContext)
  if (context === undefined) {
    throw new Error(
      'useAccommodation must be used within a AccommodationProvider'
    )
  }
  return context
}
