import {
  /* MapPin, */ ChevronRight,
  Grape,
  Menu,
  ShoppingBag
} from 'lucide-react'

import Link from 'next/link'

import NavItem from '@/app/components/layout/nav-item'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/constants'

const Header = () => {
  return (
    <header className="fixed z-10 flex w-full max-w-screen-xl items-center justify-between overflow-hidden rounded-xl rounded-t-none bg-pearl-50 p-2 shadow">
      <div className="flex w-12 justify-end md:hidden md:w-[152px]">
        <Sheet>
          <SheetTrigger
            className="grid size-12 place-content-center rounded-lg hover:bg-pearl-100"
            aria-label="menu"
          >
            <Menu className="size-8 stroke-zinc-950" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-pearl-50 px-0">
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
                    className="flex h-12 items-center justify-between rounded-lg px-4 text-base text-zinc-950 hover:bg-pearl-100"
                    label={item.label}
                  >
                    <ChevronRight className="size-6 stroke-zinc-950" />
                  </NavItem>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Link
        className="flex items-center space-x-2 p-0 hover:opacity-70 md:pl-2"
        href="/"
        aria-label="home"
      >
        <Grape className="size-8" />
        <p className="hidden font-kalnia text-2xl font-medium md:block">
          Vinito
        </p>
      </Link>

      <nav className="hidden gap-12 space-x-4 font-semibold md:flex">
        {NAV_ITEMS.map((item, index) => (
          <NavItem
            key={index}
            href={item.href}
            className="text-zinc-950"
            label={item.label}
          />
        ))}
      </nav>

      <div className="flex w-12 justify-end md:w-[113px]">
        <button
          className="grid size-12 place-content-center rounded-lg hover:opacity-70"
          aria-label="shopping bag"
        >
          <ShoppingBag className="size-8 fill-black stroke-pearl-50" />
        </button>
      </div>
    </header>
  )
}

export default Header
