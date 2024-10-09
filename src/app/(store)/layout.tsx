import { ReactNode } from 'react'

import { cookies } from 'next/headers'

import { Footer, Header } from '@/app/(store)/components/layout'
import { CartProvider } from '@/app/(store)/contexts/cart'
import { DialogProvider } from '@/app/contexts/dialogs'

export default function StoreLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const cookieStore = cookies()
  const cartItems = cookieStore.get('cartItems')?.value

  return (
    <>
      <CartProvider cookieCartItems={cartItems ? JSON.parse(cartItems) : []}>
        <DialogProvider>
          <Header />
          <main className="mt-16 flex min-h-screen w-full max-w-screen-xl flex-col items-center justify-start p-2">
            {children}
          </main>
          <Footer />
        </DialogProvider>
      </CartProvider>
    </>
  )
}
