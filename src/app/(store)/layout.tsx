import { ReactNode } from 'react'

import { Footer, Header } from '@/app/(store)/components/layout'
import { CartProvider } from '@/app/(store)/contexts/cart'
import { DialogProvider } from '@/app/contexts/dialogs'

export default function StoreLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <CartProvider>
        <DialogProvider>
          <Header />
          <main className="mt-16 flex min-h-screen w-full max-w-(--breakpoint-xl) flex-col items-center justify-start p-2">
            {children}
          </main>
          <Footer />
        </DialogProvider>
      </CartProvider>
    </>
  )
}
