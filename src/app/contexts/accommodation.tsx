'use client'

import React, { createContext, useContext, useState } from 'react'

export type Accommodation = {
  id: string
  name: string
  address: string
}

type AccommodationContextType = [
  accommodation: Accommodation | undefined,
  setAccommodation: (accommodation: Accommodation | undefined) => void
]

const AccommodationContext = createContext<
  AccommodationContextType | undefined
>(undefined)

export function AccommodationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [accommodation, setAccommodation] = useState<Accommodation | undefined>(
    undefined
  )

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
