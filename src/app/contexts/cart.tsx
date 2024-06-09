'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedItems = localStorage.getItem('cartItems')
    return storedItems ? JSON.parse(storedItems) : []
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
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

  const removeItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    )
  }

  const updateItem = (itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateItem, clearCart }}
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
