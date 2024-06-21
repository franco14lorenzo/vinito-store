'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { useAccommodation } from '@/app/contexts/accommodation'

interface Accommodation {
  id: string
  name: string
  address: string
}

const AccommodationParams = () => {
  const searchParams = useSearchParams()
  const accommodationId = searchParams.get('accommodation_id')
  const [, setAccommodation] = useAccommodation()

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
  }, [accommodationId, setAccommodation])

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
  }, [accommodationId, setAccommodation])

  return <></>
}

export default AccommodationParams
