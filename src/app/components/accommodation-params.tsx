'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { useAccommodation } from '@/app/contexts/accommodation'

import {
  clearAccommodationCookie,
  getAccommodationById,
  setAccommodationCookie
} from '../contexts/actions'

const AccommodationParams = () => {
  const searchParams = useSearchParams()
  const accommodationId = searchParams.get('accommodation_id')
  const [, setAccommodation] = useAccommodation()

  useEffect(() => {
    const fetchAccommodation = async () => {
      if (accommodationId === '0') {
        await clearAccommodationCookie()
      }

      if (accommodationId) {
        const { data } = await getAccommodationById(accommodationId)

        if (data) {
          await setAccommodationCookie(data)
          setAccommodation(data)
        } else {
          await clearAccommodationCookie()
          setAccommodation(undefined)
        }
      }
    }

    fetchAccommodation()
  }, [accommodationId, setAccommodation])

  return <></>
}

export default AccommodationParams
