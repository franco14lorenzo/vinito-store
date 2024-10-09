import NavItem from '@/app/(store)/components/layout/header/nav-item'
import { NAV_ITEMS } from '@/constants'

const Navigation = () => {
  return (
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
  )
}

export default Navigation
