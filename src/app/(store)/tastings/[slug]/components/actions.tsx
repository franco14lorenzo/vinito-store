'use client'
import { useState } from 'react'

/* import { Minus, Plus } from 'lucide-react' */
import { useCart } from '@/app/(store)/contexts/cart'
import { Dialogs, useDialog } from '@/app/contexts/dialogs'
import { Button } from '@/components/ui/button'

const Actions = ({
  item
}: {
  item: { id: number; price: number; name: string; stock: number; slug: string }
}) => {
  const [quantity /* setQuantity */] = useState(1)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDialogOpen] = useDialog()

  const { addItem, items } = useCart()

  const currentCartItem = items.find((cartItem) => cartItem.id === item.id)
  const currentQuantityInCart = currentCartItem ? currentCartItem.quantity : 0
  const totalDesiredQuantity = currentQuantityInCart + quantity

  return (
    <section className="grid w-full grid-cols-1 gap-4 self-start py-2 md:w-72">
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold leading-10">
          ${item.price.toFixed(2)}{' '}
          <span className="text-[10px] font-light">
            {' '}
            Inc. todos los impuestos
          </span>
        </p>
        {/* <div className="flex w-20  items-center font-semibold">
          <button
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className={`grid size-6 place-content-center rounded-full bg-black leading-5 text-white disabled:cursor-not-allowed disabled:opacity-50
              `}
            onClick={() => {
              setQuantity(quantity - 1)
            }}
          >
            <Minus size={10} strokeWidth={4} />
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button
            disabled={totalDesiredQuantity >= item.stock}
            aria-label="Increase quantity"
            className={`grid size-6 place-content-center rounded-full bg-black leading-5 text-white disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={10} strokeWidth={4} />
          </button>
        </div> */}
      </div>

      <Button
        className="h-10 w-full rounded-full bg-black py-3 text-white hover:opacity-80"
        disabled={item.stock <= 0 || totalDesiredQuantity > item.stock}
        onClick={() => {
          addItem({
            id: item.id,
            name: item.name,
            slug: item.slug,
            quantity,
            price: item.price,
            stock: item.stock
          })
          setDialogOpen(Dialogs.Cart)
        }}
      >
        Añadir al carrito
      </Button>
      {item.stock <= 0 ||
        (totalDesiredQuantity > item.stock && (
          <span className="text-[10px] font-light">
            Ya añadiste la cantidad máxima de este producto al carrito
          </span>
        ))}
    </section>
  )
}

export default Actions
