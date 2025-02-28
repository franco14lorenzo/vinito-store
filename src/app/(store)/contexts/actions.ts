'use server'

import { cookies } from 'next/headers'

import type { CartItem } from './cart'

export async function getCartCookie() {
  const cookieStore = await cookies()
  const cartItems = cookieStore.get('cartItems')?.value

  return cartItems ? JSON.parse(cartItems) : []
}

export async function setCartCookie(items: CartItem[]) {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'cartItems',
    path: '/',
    value: JSON.stringify(items)
  })
}

export async function clearCartCookie() {
  const cookieStore = await cookies()

  cookieStore.delete('cartItems')
}
