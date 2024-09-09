import { ReactNode, Suspense } from 'react'

import type { Metadata } from 'next'
import { Kalnia, Raleway } from 'next/font/google'
import { cookies } from 'next/headers'

import { Footer, Header } from '@/app/components/layout'
import AccommodationParams from '@/app/components/layout/accommodation-params'
import { AccommodationProvider } from '@/app/contexts/accommodation'
import { CartProvider } from '@/app/contexts/cart'
import { DialogProvider } from '@/app/contexts/dialogs'

import './globals.css'

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const kalnia = Kalnia({ subsets: ['latin'], variable: '--font-kalnia' })

export const metadata: Metadata = {
  title: {
    template: '%s | Vinito',
    default: 'Vinito Store'
  },
  description: 'Live the best wine tasting experience with Vinito',
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
  const cookieStore = cookies()
  const cartItems = cookieStore.get('cartItems')?.value

  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${kalnia.variable} flex min-h-screen w-full flex-col items-center justify-start bg-neutral-50 font-raleway text-zinc-950`}
      >
        <AccommodationProvider>
          <Suspense>
            <AccommodationParams />
          </Suspense>
          <CartProvider
            cookieCartItems={cartItems ? JSON.parse(cartItems) : []}
          >
            <DialogProvider>
              <Header />
              <main className="mt-16 flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-start p-2">
                {children}
              </main>
              <Footer />
            </DialogProvider>
          </CartProvider>
        </AccommodationProvider>
      </body>
    </html>
  )
}
