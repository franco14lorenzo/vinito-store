'use client'

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { usePathname } from 'next/navigation'

export enum Dialogs {
  Menu,
  Cart
}

type DialogContextType = [
  Dialogs | null,
  Dispatch<SetStateAction<Dialogs | null>>
]

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState<Dialogs | null>(null)

  const pathname = usePathname()
  useEffect(() => {
    setDialogOpen(null)

    return () => {
      setDialogOpen(null)
    }
  }, [pathname])

  return (
    <DialogContext.Provider value={[dialogOpen, setDialogOpen]}>
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
