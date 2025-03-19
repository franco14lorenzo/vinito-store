'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import {
  clearCartCookie,
  getCartCookie,
  setCartCookie
} from '@/app/(store)/contexts/actions'

export type CartItem = {
  id: number
  slug: string
  name: string
  quantity: number
  price: number
  stock: number
  image: string | null
}

interface CartContextType {
  loadingItems: boolean
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number) => void
  updateItem: (itemId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [loadingItems, setLoadingItems] = useState(true)
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartCookie = async () => {
      const cartItems = await getCartCookie()
      setItems(cartItems)
      setLoadingItems(false)
    }

    fetchCartCookie()
  }, [])

  useEffect(() => {
    const updateCartCookie = async () => {
      await setCartCookie(items)
    }

    if (items.length > 0) {
      updateCartCookie()
    }
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      } else {
        return [...prevItems, item]
      }
    })
  }

  const removeItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    )
  }

  const updateItem = (itemId: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    )
  }

  const clearCart = async () => {
    setItems([])
    await clearCartCookie()
  }

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        loadingItems,
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook para usar el contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
