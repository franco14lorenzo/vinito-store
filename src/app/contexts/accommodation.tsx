'use client'

import React, { createContext, useContext } from 'react'

export type Accommodation = {
  id: string
  name: string
  address: string
}

type AccommodationContextType = [accommodation: Accommodation | undefined]

const AccommodationContext = createContext<
  AccommodationContextType | undefined
>(undefined)

export function AccommodationProvider({
  children,
  initialAccommodation
}: {
  children: React.ReactNode
  initialAccommodation?: Accommodation
}) {
  return (
    <AccommodationContext.Provider value={[initialAccommodation]}>
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
