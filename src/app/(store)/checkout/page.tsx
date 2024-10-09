import { ArrowRight } from 'lucide-react'

import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'

import ClientPage from '@/app/(store)/checkout/components/checkout-client-page'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Buy your favorite wines'
}

export default async function CheckoutPage() {
  const cookieStore = cookies()
  const cartItems = cookieStore.get('cartItems')?.value
  const items = cartItems ? JSON.parse(cartItems) : []

  return (
    <>
      <h1 className="my-6 w-full text-center font-kalnia text-3xl font-bold">
        Checkout
      </h1>
      {items?.length ? (
        <ClientPage />
      ) : (
        <section className="flex w-full flex-1 flex-col items-center justify-center px-4 pb-56 text-center">
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <p className="px-4 py-2 text-center text-sm">Your bag is empty</p>
            <p className="px-4 py-2 text-center text-lg font-semibold">
              Add some items to get started!
            </p>
            <Link
              className="mt-4 max-w-fit rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
              href="/tastings"
            >
              Discover our tastings
              <ArrowRight className="ml-2 inline size-5" />
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
