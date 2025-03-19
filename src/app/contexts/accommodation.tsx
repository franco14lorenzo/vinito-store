'use client'

import React, { createContext, useContext, useEffect } from 'react'

import { getAccommodationCookie } from './actions'

export type Accommodation = {
  id: string
  name: string
  address: string
}

type AccommodationContextType = [
  accommodation: Accommodation | undefined,
  loadingAccommodation: boolean
]

const AccommodationContext = createContext<
  AccommodationContextType | undefined
>(undefined)

export function AccommodationProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [loadingAccommodation, setLoadingAccommodation] = React.useState(true)
  const [accommodation, setAccommodation] = React.useState<
    Accommodation | undefined
  >(undefined)

  useEffect(() => {
    async function fetchAccommodation() {
      const accommodation = await getAccommodationCookie()
      setAccommodation(accommodation)
      setLoadingAccommodation(false)
    }
    fetchAccommodation()
  }, [])
  return (
    <AccommodationContext.Provider
      value={[accommodation, loadingAccommodation]}
    >
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
