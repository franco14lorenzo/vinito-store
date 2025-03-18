import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Kalnia, Raleway } from 'next/font/google'
import { cookies } from 'next/headers'

import { AccommodationProvider } from '@/app/contexts/accommodation'
import { DialogProvider } from '@/app/contexts/dialogs'
import { Toaster } from '@/components/ui/toaster'

import { PostHogProvider } from './contexts/posthog'

import './globals.css'

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const kalnia = Kalnia({ subsets: ['latin'], variable: '--font-kalnia' })

export const metadata: Metadata = {
  title: {
    template: '%s | Vinito',
    default: 'Vinito Store'
  },
  description: 'Vive la mejor experiencia de degustaciones de vinos con Vinito',
  robots: {
    follow: false,
    index: false
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  let initialAccommodation

  const cookieStore = await cookies()
  const accommodationCookie = cookieStore.get('accommodation')

  if (accommodationCookie?.value) {
    try {
      initialAccommodation = JSON.parse(accommodationCookie.value)
    } catch (error) {
      console.error('Error parsing accommodation cookie:', error)
    }
  }

  return (
    <html lang="es">
      <body
        className={`${raleway.variable} ${kalnia.variable} font-raleway flex min-h-screen w-full flex-col items-center justify-start bg-neutral-50 text-zinc-950`}
      >
        <PostHogProvider>
          <AccommodationProvider initialAccommodation={initialAccommodation}>
            <DialogProvider>{children}</DialogProvider>
          </AccommodationProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  )
}
