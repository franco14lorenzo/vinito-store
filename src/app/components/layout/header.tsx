import { /* MapPin, */ Grape, Menu, ShoppingBag } from 'lucide-react'

import Link from 'next/link'

const Header = () => {
  return (
    <header className="fixed z-10 flex w-full max-w-screen-xl items-center justify-between overflow-hidden rounded-xl rounded-t-none bg-pearl-50 p-2 shadow">
      <div
        className="flex w-12 justify-end md:hidden md:w-[152px]"
        aria-label="menu"
      >
        <button className="grid size-12 place-content-center rounded-lg hover:bg-pearl-100">
          <Menu className="size-8 stroke-black" />
        </button>
      </div>
      {/*  <button className="hidden h-12 w-12 items-center justify-center space-x-2 rounded-lg hover:bg-pearl-100 md:flex md:w-[152px] md:justify-start">
        <MapPin className="size-8 fill-black stroke-pearl-50" />
        <div className="hidden flex-col items-center text-left text-xs md:flex [&>*]:w-full">
          <p>Deliver to</p>
          <p className="font-bold">BNB 001</p>
        </div>
      </button> */}
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
        <Link href="/shop" className="hover:opacity-70">
          Shop
        </Link>
        <Link href="/about" className="hover:opacity-70">
          About
        </Link>
        <Link href="/contact" className="hover:opacity-70">
          Contact
        </Link>
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
