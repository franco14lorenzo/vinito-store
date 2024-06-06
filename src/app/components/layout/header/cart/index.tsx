import { ShoppingBag } from 'lucide-react'

const Cart = () => {
  return (
    <div className="flex w-12 justify-end md:w-[113px]">
      <button
        className="grid size-12 place-content-center rounded-lg hover:opacity-70"
        aria-label="shopping bag"
      >
        <ShoppingBag className="size-8 fill-black stroke-pearl-50" />
      </button>
    </div>
  )
}

export default Cart
