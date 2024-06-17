'use client'

import { useIsClient } from '@uidotdev/usehooks'
import { Minus, Plus, ShoppingBag, Trash } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useCart } from '@/app/contexts/cart'
import { Dialogs, useDialog } from '@/app/contexts/dialogs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

const Cart = () => {
  const { push } = useRouter()
  const isClient = useIsClient()
  const { items } = useCart()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const totalPrice = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)

  const [dialogOpen, setDialogOpen] = useDialog()

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen ? Dialogs.Cart : null)
  }

  return (
    <div className="flex w-12 justify-end md:w-[152px]">
      <Sheet open={dialogOpen === Dialogs.Cart} onOpenChange={handleOpenChange}>
        <SheetTrigger
          className="relative grid size-12 place-content-center rounded-lg hover:opacity-70"
          aria-label="shopping bag"
        >
          <ShoppingBag className="size-8 fill-black stroke-pearl-50" />
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-pearl-50 bg-red-500 text-xs font-medium leading-5 text-white">
            {isClient ? totalItems : '...'}
          </span>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col gap-0 bg-pearl-50 px-0 pt-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle className="rounded-b-lg border-zinc-950/50 px-4 pb-4 pt-4 text-left font-kalnia text-2xl font-medium shadow">
              Bag
            </SheetTitle>
          </SheetHeader>
          <SheetDescription asChild>
            <div
              className={`flex flex-1 flex-col overflow-y-auto text-left ${
                items.length === 0 ? 'justify-center' : 'justify-start'
              }`}
            >
              <div className="grid overflow-y-auto px-4 text-left">
                {items.length === 0 && (
                  <div className="flex flex-col justify-center">
                    <p className="px-4 py-2 text-center text-sm">
                      Your bag is empty
                    </p>
                    <p className="px-4 py-2 text-center text-lg font-semibold">
                      Add some items to get started!
                    </p>
                  </div>
                )}
                {items.length > 0 &&
                  items.map((item) => <Item key={item.id} item={item} />)}
              </div>
            </div>
          </SheetDescription>
          <SheetFooter>
            <div className="grid w-full pt-4">
              <section className="flex justify-between px-4 text-sm font-semibold">
                <p>Shipping</p>
                <span className="font-semibold text-green-500">
                  Free for you
                </span>
              </section>
              <div className="mt-4 flex flex-1 flex-col gap-6 border-t border-zinc-950/20 p-4 pb-0">
                <section className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </section>
                <section className="flex flex-col gap-2 font-medium">
                  <button
                    type="button"
                    disabled={items.length === 0}
                    className="w-full cursor-pointer rounded-full bg-black py-3 text-center text-white hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      if (items.length !== 0) {
                        push('/checkout')
                        setDialogOpen(null)
                      }
                    }}
                  >
                    Go to Checkout
                  </button>
                </section>
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const Item = ({
  item
}: {
  item: { id: string; name: string; quantity: number; price: number }
}) => {
  const { removeItem, updateItem } = useCart()
  const [, setDialogOpen] = useDialog()

  return (
    <article
      key={item.id}
      className="flex h-[89px] justify-between border-b border-zinc-950/20 py-4"
    >
      <section className="flex gap-4">
        <div className=" flex size-14 items-center rounded-lg bg-white" />

        <div className="flex flex-col justify-between py-0.5">
          <Link
            href={`/tastings/${item.id.toLowerCase().replace(/ /g, '-')}`}
            className="text-base font-semibold hover:underline"
            onClick={() => setDialogOpen(null)}
          >
            {item.name} Tasting
          </Link>
          <div className="flex w-14  items-center rounded-lg border border-zinc-950/50 font-semibold">
            <button
              aria-label="Decrease quantity"
              className={`grid size-5 place-content-center rounded-l-full border-r border-zinc-950/50 leading-5
            ${item.quantity === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => {
                if (item.quantity > 1) {
                  updateItem(item.id, item.quantity - 1)
                }
              }}
            >
              <Minus size={10} strokeWidth={4} />
            </button>

            <span className="flex-1 px-1.5 text-center">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              className="grid size-5 place-content-center rounded-r-full border-l border-zinc-950/50 leading-5"
              onClick={() => updateItem(item.id, item.quantity + 1)}
            >
              <Plus size={10} strokeWidth={4} />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-end justify-between py-0.5">
        <button
          className="grid place-content-center rounded-full leading-5 text-zinc-950/50 hover:text-zinc-950/80"
          aria-label="Remove item"
          onClick={() => {
            const confirm = window.confirm(
              `Are you sure you want to remove ${item.name} from your cart?`
            )
            if (confirm) {
              removeItem(item.id)
            }
          }}
        >
          <Trash className="size-4" />
        </button>
        <p className="text-base font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </section>
    </article>
  )
}

export default Cart
