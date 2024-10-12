import { Grape } from 'lucide-react'

import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      className="flex items-center space-x-2 p-0 hover:opacity-70 md:pl-4"
      href="/"
      aria-label="inicio"
    >
      <Grape className="size-8" />
      <p className="font-kalnia text-2xl font-medium">Vinito</p>
    </Link>
  )
}

export default Logo
