'use server'

import { cookies } from 'next/headers'

import type { CartItem } from './cart'

export async function setCartCookie(items: CartItem[]) {
  const cookieStore = cookies()

  cookieStore.set({
    name: 'cartItems',
    path: '/',
    value: JSON.stringify(items)
  })
}

export async function clearCartCookie() {
  const cookieStore = cookies()

  cookieStore.delete('cartItems')
}
