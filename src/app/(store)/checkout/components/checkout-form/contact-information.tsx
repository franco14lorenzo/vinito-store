import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function ContactInformation({
  form
}: {
  form: UseFormReturn<
    {
      name: string
      surname: string
      email: string
      phone: string
      accommodation: string
      deliveryDate: Date
      deliveryTime: string
      paymentMethod: string
      customerNote?: string | undefined
    },
    any,
    undefined
  >
}) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-bold">Información de contacto</h2>
      <article className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Nombre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Apellido <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  Teléfono <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="border bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="customerNote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Algo más que debamos saber?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe aquí tu mensaje"
                  {...field}
                  className="border bg-white"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Por favor, déjanos saber si tienes alguna petición especial o
                requerimiento adicional. Es opcional.
              </FormDescription>
            </FormItem>
          )}
        />
      </article>
    </section>
  )
}

export default ContactInformation
