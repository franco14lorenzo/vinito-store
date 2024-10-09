import Cart from '@/app/(store)/components/layout/header/cart'
import Navigation from '@/app/(store)/components/layout/header/navigation'
import SideMenu from '@/app/(store)/components/layout/header/side-menu'
import Logo from '@/app/components/logo'

const Header = () => {
  return (
    <header className="fixed z-20 flex w-full max-w-screen-xl items-center justify-between overflow-hidden rounded-xl rounded-t-none bg-neutral-50 p-2 shadow">
      <SideMenu />
      <Logo />
      <Navigation />
      <Cart />
    </header>
  )
}

export default Header
