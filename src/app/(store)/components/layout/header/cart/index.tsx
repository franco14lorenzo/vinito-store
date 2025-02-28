'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsClient } from '@uidotdev/usehooks'
import {
  ArrowRight,
  ImageOff,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash
} from 'lucide-react'

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
import { formatCurrency } from '@/lib/utils'

const Cart = () => {
  const isClient = useIsClient()
  const pathname = usePathname()

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
              Tu compra
            </SheetTitle>
          </SheetHeader>
          <SheetDescription asChild>
            <div
              className={`flex flex-1 flex-col justify-start overflow-y-auto text-left`}
            >
              {accommodation && (
                <section className="flex w-full max-w-full flex-row gap-2 self-start overflow-x-hidden px-4 pb-2 pt-3">
                  <div className="flex items-center justify-center">
                    <MapPin className="size-6" />
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden">
                    <p className="text-[8px] leading-[10px]">Entrega en</p>
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
                      No hay artículos en tu compra
                    </p>
                    <p className="px-4 py-2 text-center text-base font-semibold">
                      ¡Agrega algunos artículos para comenzar!
                    </p>
                    <Link
                      className="mt-4 flex h-12 max-w-fit items-center justify-center rounded-full border border-white bg-black px-4 py-2 font-medium text-white hover:bg-opacity-80"
                      href="/degustaciones"
                      onClick={() =>
                        pathname === '/degustaciones' && setDialogOpen(null)
                      }
                    >
                      <span>Descubre nuestras catas</span>
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
                  {formatCurrency(totalPrice)}
                </span>
              </section>
              <section className="flex justify-between px-4 text-sm font-semibold">
                <p>Envío</p>
                <span className="font-semibold text-green-500">Gratis</span>
              </section>
              <div className="mt-4 flex flex-1 flex-col gap-6 border-t border-zinc-950/20 p-4 pb-0">
                <section className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>{formatCurrency(totalPrice)}</p>
                </section>
                <section className="flex flex-col gap-2 font-medium">
                  <Link
                    href="/checkout"
                    type="button"
                    className={`w-full cursor-pointer rounded-full bg-black py-3 text-center text-white hover:opacity-80 ${
                      items.length === 0 &&
                      'pointer-events-none cursor-not-allowed opacity-50'
                    }`}
                    onClick={() =>
                      pathname === '/checkout' && setDialogOpen(null)
                    }
                  >
                    Finalizar compra
                  </Link>
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
    image: string | null
  }
  isCheckoutVariant?: boolean
}) => {
  const { removeItem, updateItem } = useCart()
  const [, setDialogOpen] = useDialog()

  return (
    <article key={item.id} className="flex h-[89px] justify-between py-4">
      <section className="flex gap-4">
        <div className="relative size-14 overflow-hidden rounded-lg bg-neutral-100">
          {item.image ? (
            <Image
              className="overflow-hidden rounded-lg bg-neutral-100 object-cover"
              src={item.image}
              fill
              sizes="56px"
              alt={item.name}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="size-6 text-zinc-400" strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div
          className={`flex ${
            isCheckoutVariant ? 'flex-col md:flex-row md:gap-4' : 'flex-col'
          } justify-between`}
        >
          <Link
            href={`/degustaciones/${item.slug}`}
            className="text-base font-semibold hover:underline"
            onClick={() => setDialogOpen(null)}
          >
            {item.name}
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
          <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
            <DialogHeader>
              <DialogTitle>Eliminar {item.name} de tu compra</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar {item.name} de tu compra?
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
                Eliminar
              </button>
              <DialogClose
                asChild
                className="rounded-full bg-black px-4 py-2 text-white"
              >
                <button type="button">Cerrar</button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="text-base font-bold">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </section>
    </article>
  )
}

export default Cart
