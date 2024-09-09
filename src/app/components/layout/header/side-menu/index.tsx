'use client'
import { useEffect } from 'react'
import { useWindowSize } from '@uidotdev/usehooks'
import { ChevronRight, Grape, Menu } from 'lucide-react'

import Link from 'next/link'

import NavItem from '@/app/components/layout/header/nav-item'
import { Dialogs, useDialog } from '@/app/contexts/dialogs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/constants'

const SideMenu = () => {
  const [dialogOpen, setDialogOpen] = useDialog()
  const { width } = useWindowSize()

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen ? Dialogs.Menu : null)
  }

  const handleOpenClose = () => {
    setDialogOpen(null)
  }

  useEffect(() => {
    if (width && width > 768) {
      setDialogOpen(null)
    }
  }, [width, setDialogOpen])

  return (
    <div className="flex w-12 justify-end md:hidden md:w-[152px]">
      <Sheet open={dialogOpen === Dialogs.Menu} onOpenChange={handleOpenChange}>
        <SheetTrigger
          className="grid size-12 place-content-center rounded-lg hover:bg-neutral-100"
          aria-label="menu"
        >
          <Menu className="size-8 stroke-zinc-950" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-neutral-50 px-0 pt-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle className="rounded-b-lg border-zinc-950/50 px-4 pb-4 pt-4 shadow">
              <Link
                className="flex items-center space-x-2 p-0 hover:opacity-70 md:pl-2"
                href="/"
                aria-label="home"
                onClick={handleOpenClose}
              >
                <Grape className="size-8" />
                <p className="font-kalnia text-2xl font-medium">Vinito</p>
              </Link>
            </SheetTitle>
            <SheetDescription className="grid py-4 text-left">
              {NAV_ITEMS.map((item, index) => (
                <NavItem
                  key={index}
                  href={item.href}
                  className="flex h-12 items-center justify-between rounded-lg px-4 text-base font-semibold text-zinc-950 hover:bg-neutral-100"
                  label={item.label}
                  side
                  onClick={handleOpenClose}
                >
                  <ChevronRight className="size-6 stroke-zinc-950" />
                </NavItem>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SideMenu
