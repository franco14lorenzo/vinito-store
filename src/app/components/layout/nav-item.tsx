'use client'
import { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({
  href,
  className,
  label,
  children
}: {
  href: string
  className?: string
  label: string
  children?: ReactNode
}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`hover:opacity-70 ${
        pathname.startsWith(href) ? 'underline' : ''
      } ${className} `}
    >
      {label}
      {children}
    </Link>
  )
}

export default NavItem
