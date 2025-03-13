import { ReactNode, Suspense } from 'react'
import type { Metadata } from 'next'
import { Kalnia, Raleway } from 'next/font/google'

import AccommodationParams from '@/app/components/accommodation-params'
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

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${raleway.variable} ${kalnia.variable} font-raleway flex min-h-screen w-full flex-col items-center justify-start bg-neutral-50 text-zinc-950`}
      >
        <PostHogProvider>
          <AccommodationProvider>
            <Suspense>
              <AccommodationParams />
            </Suspense>
            <DialogProvider>{children}</DialogProvider>
          </AccommodationProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  )
}
