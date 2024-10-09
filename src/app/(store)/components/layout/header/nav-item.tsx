'use client'
import { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({
  href,
  className,
  label,
  children,
  side = false,
  onClick
}: {
  href: string
  className?: string
  label: string
  children?: ReactNode
  side?: boolean
  onClick?: () => void
}) => {
  const pathname = usePathname()
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`hover:opacity-70 ${
        pathname.startsWith(href) && !side ? 'border-b-2 border-zinc-950' : ''
      } ${className} `}
    >
      <span
        className={`${
          pathname.startsWith(href) && side ? 'border-b-2 border-zinc-950' : ''
        }`}
      >
        {label}
      </span>
      {children}
    </Link>
  )
}

export default NavItem
