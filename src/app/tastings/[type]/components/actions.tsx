'use client'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

import { useCart } from '@/app/contexts/cart'
import { Dialogs, useDialog } from '@/app/contexts/dialogs'

const Actions = ({ item }: { item: { price: number; name: string } }) => {
  const [quantity, setQuantity] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDialogOpen] = useDialog()

  const { addItem } = useCart()

  return (
    <section className="grid w-full grid-cols-1 gap-4 self-start py-2 md:w-72">
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold leading-10">${item.price.toFixed(2)}</p>
        <div className="flex w-20  items-center font-semibold">
          <button
            className={`grid size-5 place-content-center rounded-full bg-black leading-5 text-white ${
              quantity === 1 ? 'cursor-not-allowed opacity-50' : ''
            }
              `}
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1)
              }
            }}
          >
            <Minus size={10} strokeWidth={4} />
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            className="grid size-5 place-content-center rounded-full bg-black leading-5 text-white"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={10} strokeWidth={4} />
          </button>
        </div>
      </div>
      <button
        className="w-full rounded-full bg-black py-3 text-white hover:opacity-80"
        onClick={() => {
          addItem({
            id: item.name,
            name: item.name,
            quantity,
            price: item.price
          })
          setDialogOpen(Dialogs.Cart)
        }}
      >
        Add to Bag
      </button>
    </section>
  )
}

export default Actions
