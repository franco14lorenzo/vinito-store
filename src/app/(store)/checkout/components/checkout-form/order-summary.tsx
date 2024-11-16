import { Loader2 } from 'lucide-react'

import { Item } from '@/app/(store)/components/layout/header/cart'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

function OrderSummary({
  items,
  totalPrice,
  loading
}: {
  items: {
    id: number
    slug: string
    name: string
    quantity: number
    price: number
    stock: number
    image: string | null
  }[]
  totalPrice: string
  loading: boolean
}) {
  return (
    <section className="flex w-full flex-col gap-4 self-stretch py-4 md:max-w-[400px] md:flex-1">
      <Accordion type="single" collapsible className="w-full md:hidden">
        <AccordionItem
          key="summary"
          value="summary"
          className="border-zinc-950/20"
        >
          <AccordionTrigger className="font-semibold">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-base font-bold">Resumen de la orden</h2>
              <span className="mr-1 text-[10px]">Detalles</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <article className="flex h-full flex-col rounded border bg-white pb-4 md:max-w-[400px]">
              <div className="flex flex-grow flex-col overflow-y-auto px-4 text-left">
                {items.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-auto grid w-full border-t pt-4">
                <section className="mb-2 flex justify-between px-4 text-sm font-semibold">
                  <p>Subtotal</p>
                  <span className="font-semibold text-zinc-800">
                    {totalPrice}
                  </span>
                </section>
                <section className="flex justify-between px-4 text-sm font-semibold">
                  <p>Envío</p>
                  <span className="font-semibold text-green-500">Gratis</span>
                </section>
                <div className="mt-4 flex flex-col gap-6 border-t p-4 pb-0">
                  <section className="flex justify-between text-xl font-bold">
                    <p>Total</p>
                    <p>{totalPrice}</p>
                  </section>
                </div>
              </div>
            </article>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="hidden text-base font-bold md:block">
        Resumen de la orden
      </h2>
      <article className="hidden h-full flex-col rounded border bg-white pb-4 md:flex md:max-w-[400px] md:pb-10 md:pt-6">
        <div className="flex flex-grow flex-col overflow-y-auto px-4 text-left">
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        <div className="mt-auto grid w-full border-t pt-4">
          <section className="mb-2 flex justify-between px-4 text-sm font-semibold">
            <p>Subtotal</p>
            <span className="font-semibold text-zinc-800">{totalPrice}</span>
          </section>
          <section className="flex justify-between px-4 text-sm font-semibold">
            <p>Envío</p>
            <span className="font-semibold text-green-500">Gratis</span>
          </section>
          <div className="mt-4 flex flex-col gap-6 border-t p-4 pb-0">
            <section className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>{totalPrice}</p>
            </section>
            <Button
              disabled={loading}
              type="submit"
              className="hidden h-10 w-full rounded-full md:inline-flex"
            >
              {!loading ? (
                'Comprar ahora'
              ) : (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    aria-label="Cargando"
                  />
                  <span>Procesando tu compra</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default OrderSummary
