'use client'

import { useIsClient } from '@uidotdev/usehooks'
import {
  ArrowRight,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash
} from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useCart } from '@/app/(store)/contexts/cart'
import { useAccommodation } from '@/app/contexts/accommodation'
import { Dialogs, useDialog } from '@/app/contexts/dialogs'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
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

  const { items, totalItems, totalPrice } = useCart()

  const [accommodation] = useAccommodation()

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
          <ShoppingBag className="size-8 fill-black stroke-neutral-50" />
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-50 bg-red-500 text-xs font-medium leading-5 text-white">
            {isClient ? totalItems : '...'}
          </span>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col gap-0 bg-neutral-50 px-0 pt-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle className="rounded-b-lg border-zinc-950/50 px-4 pb-4 pt-4 text-left font-kalnia text-2xl font-medium shadow">
              Bag
            </SheetTitle>
          </SheetHeader>
          <SheetDescription asChild>
            <div
              className={`flex flex-1 flex-col justify-start overflow-y-auto text-left`}
            >
              {accommodation && (
                <section className="flex w-full max-w-full flex-row gap-2 self-start overflow-x-hidden px-4 py-2">
                  <div className="flex items-center justify-center">
                    <MapPin className="size-6" />
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <p className="text-[8px] leading-[10px]">Deliver to</p>
                    <p className="truncate text-xs font-semibold">
                      {accommodation?.name} - {accommodation?.address}
                    </p>
                  </div>
                </section>
              )}

              <div
                className={`grid overflow-y-auto px-4 text-left ${
                  items.length === 0 && 'flex-1'
                }`}
              >
                {items.length === 0 && (
                  <div className="flex flex-col items-center justify-center">
                    <p className="px-4 py-2 text-center text-sm">
                      Your bag is empty
                    </p>
                    <p className="px-4 py-2 text-center text-lg font-semibold">
                      Add some items to get started!
                    </p>
                    <Link
                      className="mt-4 max-w-fit rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
                      href="/tastings"
                      onClick={() => setDialogOpen(null)}
                    >
                      Discover our tastings
                      <ArrowRight className="ml-2 inline size-5" />
                    </Link>
                  </div>
                )}
                {items.length > 0 &&
                  items.map((item) => <Item key={item.id} item={item} />)}
              </div>
            </div>
          </SheetDescription>
          <SheetFooter>
            <div className="grid w-full border-t border-zinc-950/20 pt-4">
              <section className="mb-2 flex justify-between px-4 text-sm font-semibold">
                <p>Subtotal</p>
                <span className="font-semibold text-zinc-800">
                  ${totalPrice}
                </span>
              </section>
              <section className="flex justify-between px-4 text-sm font-semibold">
                <p>Shipping</p>
                <span className="font-semibold text-green-500">Free</span>
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

export const Item = ({
  item,
  isCheckoutVariant = false
}: {
  item: {
    id: number
    slug: string
    name: string
    quantity: number
    price: number
    stock: number
  }
  isCheckoutVariant?: boolean
}) => {
  const { removeItem, updateItem } = useCart()
  const [, setDialogOpen] = useDialog()

  return (
    <article key={item.id} className="flex h-[89px] justify-between py-4">
      <section className="flex gap-4">
        <div className=" flex size-14 items-center rounded-lg bg-neutral-100" />

        <div
          className={`flex ${
            isCheckoutVariant ? 'flex-col md:flex-row md:gap-4' : 'flex-col'
          } justify-between`}
        >
          <Link
            href={`/tastings/${item.slug}`}
            className="text-base font-semibold hover:underline"
            onClick={() => setDialogOpen(null)}
          >
            {item.name} Tasting
          </Link>
          <div className="flex w-14  items-center rounded-lg border border-zinc-950/50 font-semibold">
            <button
              disabled={item.quantity === 1}
              type="button"
              aria-label="Decrease quantity"
              className={`grid size-5 place-content-center rounded-l-full border-r border-zinc-950/50 leading-5 disabled:cursor-not-allowed disabled:opacity-50`}
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
              disabled={item.quantity >= item.stock}
              type="button"
              aria-label="Increase quantity"
              className="grid size-5 place-content-center rounded-r-full border-l border-zinc-950/50 leading-5 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => updateItem(item.id, item.quantity + 1)}
            >
              <Plus size={10} strokeWidth={4} />
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-end justify-between">
        <Dialog>
          <DialogTrigger
            className="grid place-content-center rounded-full leading-5 text-zinc-950/50 hover:text-zinc-950/80"
            aria-label="Remove item"
          >
            <Trash className="size-4" />
          </DialogTrigger>
          <DialogContent className="gap-8">
            <DialogHeader>
              <DialogTitle>
                Remove {item.name} tasting from your cart
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to remove {item.name} tasting from your
                cart?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-center gap-2">
              <button
                type="button"
                className="rounded-full border border-black px-4 py-2 "
                onClick={() => {
                  removeItem(item.id)
                  setDialogOpen(null)
                }}
              >
                Remove
              </button>
              <DialogClose
                asChild
                className="rounded-full bg-black px-4 py-2 text-white"
              >
                <button type="button">Close</button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-base font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </section>
    </article>
  )
}

export default Cart