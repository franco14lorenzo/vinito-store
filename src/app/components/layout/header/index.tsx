import Cart from '@/app/components/layout/header/cart'
import Logo from '@/app/components/layout/header/logo'
import Navigation from '@/app/components/layout/header/navigation'
import SideMenu from '@/app/components/layout/header/side-menu'

const Header = () => {
  return (
    <header className="fixed z-10 flex w-full max-w-screen-xl items-center justify-between overflow-hidden rounded-xl rounded-t-none bg-pearl-50 p-2 shadow">
      <SideMenu />
      <Logo />
      <Navigation />
      <Cart />
    </header>
  )
}

export default Header
