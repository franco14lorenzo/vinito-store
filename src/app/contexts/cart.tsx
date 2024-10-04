'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import { clearCartCookie, setCartCookie } from './action'

export interface CartItem {
  id: number
  slug: string
  name: string
  quantity: number
  price: number
  stock: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number) => void
  updateItem: (itemId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
  cookieCartItems: CartItem[]
}

export const CartProvider: React.FC<CartProviderProps> = ({
  cookieCartItems,
  children
}) => {
  const [items, setItems] = useState<CartItem[]>(cookieCartItems || [])

  useEffect(() => {
    const updateCartCookie = async () => {
      await setCartCookie(items)
    }
    updateCartCookie()
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

  const totalPrice = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)

  return (
    <CartContext.Provider
      value={{
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
