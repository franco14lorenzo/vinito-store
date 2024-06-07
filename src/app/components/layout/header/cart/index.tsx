import { ShoppingBag } from 'lucide-react'

const Cart = () => {
  return (
    <div className="flex w-12 justify-end md:w-[113px]">
      <button
        className="relative grid size-12 place-content-center rounded-lg hover:opacity-70"
        aria-label="shopping bag"
      >
        <ShoppingBag className="size-8 fill-black stroke-pearl-50" />
        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-pearl-50 bg-red-500 text-xs font-medium leading-5 text-white">
          10
        </span>
      </button>
    </div>
  )
}

export default Cart
