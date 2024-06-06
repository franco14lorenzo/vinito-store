import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Kalnia, Raleway } from 'next/font/google'

import { Footer, Header } from '@/app/components/layout'
import { DialogProvider } from '@/app/contexts/dialogs'

import './globals.css'

const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })
const kalnia = Kalnia({ subsets: ['latin'], variable: '--font-kalnia' })

export const metadata: Metadata = {
  title: 'Vinito Store',
  description: 'Live the best wine tasting experience with Vinito'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${kalnia.variable} flex min-h-screen w-full flex-col items-center justify-start bg-pearl-50 font-raleway text-zinc-950`}
      >
        <DialogProvider>
          <Header />
          <main className="mt-16 flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-start p-2">
            {children}
          </main>
          <Footer />
        </DialogProvider>
      </body>
    </html>
  )
}
