import { /* MapPin, */ ChevronRight, Grape, Menu } from 'lucide-react'

import Link from 'next/link'

import NavItem from '@/app/components/layout/header/nav-item'
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
  return (
    <div className="flex w-12 justify-end md:hidden md:w-[152px]">
      <Sheet>
        <SheetTrigger
          className="grid size-12 place-content-center rounded-lg hover:bg-pearl-100"
          aria-label="menu"
        >
          <Menu className="size-8 stroke-zinc-950" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-pearl-50 px-0">
          <span tabIndex={0} className="sr-only" />
          <SheetHeader>
            <SheetTitle className="rounded-b-lg border-zinc-950/50 px-4 pb-4 shadow">
              <Link
                className="flex items-center space-x-2 p-0 hover:opacity-70 md:pl-2"
                href="/"
                aria-label="home"
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
                  className="flex h-12 items-center justify-between rounded-lg px-4 text-base font-semibold text-zinc-950 hover:bg-pearl-100"
                  label={item.label}
                  side
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
