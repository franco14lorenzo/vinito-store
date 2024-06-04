'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({
  href,
  className,
  label
}: {
  href: string
  className?: string
  label: string
}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`hover:opacity-70 ${
        pathname.startsWith(href) ? 'underline' : ''
      } ${className}`}
    >
      {label}
    </Link>
  )
}

export default NavItem
