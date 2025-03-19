'use client'

import type { UseFormReturn } from 'react-hook-form'
import { Banknote, Landmark } from 'lucide-react'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

function PaymentInformation({
  form,
  paymentMethods
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
    },
    any,
    undefined
  >
  paymentMethods: {
    id: number
    name: string
    type: 'cash_on_delivery' | 'bank_transfer' | null
  }[]
}) {
  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-bold">Información de pago</h2>
      <article className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Método de pago <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {paymentMethods.map((method) => (
                    <FormItem key={method.id}>
                      <FormControl>
                        <RadioGroupItem
                          value={method.id.toString()}
                          id={method.id.toString()}
                          className="peer sr-only"
                        />
                      </FormControl>
                      <Label
                        htmlFor={method.id.toString()}
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4"
                      >
                        {method.type === 'bank_transfer' ? (
                          <Landmark className="mb-3 h-6 w-6" />
                        ) : (
                          <Banknote className="mb-3 h-6 w-6" />
                        )}
                        <span className="text-sm font-medium">
                          {method.name}
                        </span>
                      </Label>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </article>
    </section>
  )
}

export default PaymentInformation
