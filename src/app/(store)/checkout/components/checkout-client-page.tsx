'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { Banknote, CalendarIcon, CreditCard } from 'lucide-react'
import { z } from 'zod'

import { useRouter } from 'next/navigation'

import { Item } from '@/app/(store)/components/layout/header/cart'
import { useCart } from '@/app/(store)/contexts/cart'
import { useAccommodation } from '@/app/contexts/accommodation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.'
  }),
  surname: z.string().min(1, {
    message: 'Surname is required.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  phone: z.string().min(6, {
    message: 'Phone must be at least 6 characters.'
  }),
  accommodation: z.string({
    required_error: 'Accommodation is required.'
  }),
  deliveryDate: z.date().refine(
    (date) => {
      const now = new Date()
      now.setHours(0, 0, 0, 0)
      return date > now
    },
    {
      message: 'Please select a date at least 24 hours from now.'
    }
  ),
  deliveryTime: z.string().min(1, {
    message: 'Delivery time is required.'
  }),
  paymentMethod: z.string().min(1, {
    message: 'Payment method is required.'
  })
})

const ClientPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [accommodation] = useAccommodation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      accommodation: accommodation?.address || '', // TODO: Review this
      deliveryDate: new Date(),
      deliveryTime: '',
      paymentMethod: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const orderId = crypto.randomUUID()
    const order = {
      id: orderId,
      status: 'pending',
      contact: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone
      },
      delivery: {
        accommodation: values.accommodation,
        date: values.deliveryDate,
        time: values.deliveryTime
      },
      payment: {
        method: values.paymentMethod
      },
      items,
      total: totalPrice
    }

    console.log(order)
    clearCart()
    router.push(`/checkout/success/?name=${values.name}&email=${values.email}`)
  }

  return (
    <Form {...form}>
      <form
        className="flex min-h-screen w-full flex-1 flex-col items-start justify-center gap-4 px-4 pb-56 md:flex-row-reverse md:justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <section className="flex w-full flex-col gap-4 self-stretch py-4 md:max-w-[400px] md:flex-1">
          <Accordion type="single" collapsible className="w-full md:hidden">
            <AccordionItem
              key="summary"
              value="summary"
              className="border-zinc-950/20"
            >
              <AccordionTrigger className="font-semibold">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-base font-bold">Order Summary</h2>
                  <span className="mr-1 text-[10px]">Details</span>
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
                        ${totalPrice}
                      </span>
                    </section>
                    <section className="flex justify-between px-4 text-sm font-semibold">
                      <p>Shipping</p>
                      <span className="font-semibold text-green-500">Free</span>
                    </section>
                    <div className="mt-4 flex flex-col gap-6 border-t p-4 pb-0">
                      <section className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>${totalPrice}</p>
                      </section>
                    </div>
                  </div>
                </article>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <h2 className="hidden text-base font-bold md:block">Order Summary</h2>
          <article className="hidden h-full flex-col rounded border bg-white pb-4 md:flex md:max-w-[400px] md:pb-10 md:pt-6">
            <div className="flex flex-grow flex-col overflow-y-auto px-4 text-left">
              {items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-auto grid w-full border-t pt-4">
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
              <div className="mt-4 flex flex-col gap-6 border-t p-4 pb-0">
                <section className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </section>
                <Button
                  type="submit"
                  className="hidden w-full rounded-full md:block"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </article>
        </section>

        <section className="flex w-full flex-1 flex-col items-start justify-start gap-4 py-4">
          <div className="flex w-full flex-col gap-4">
            <h2 className="text-base font-bold">Contact Information</h2>
            <div className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
              <div className="flex w-full flex-col gap-4 md:flex-row">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className=" border bg-white"
                        />
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
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          className="border bg-white"
                        />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="johndoe@example.com"
                          {...field}
                          className="border bg-white"
                        />
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          className="border bg-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <h2 className="text-base font-bold">Delivery Information</h2>
            <div className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
              <FormField
                control={form.control}
                name="accommodation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accommodation</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        className="border bg-white read-only:bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full flex-1 bg-white pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Please select a date at least 24 hours from now.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (9am - 12pm)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12pm - 6pm)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (6pm - 9pm)
                        </SelectItem>
                        <SelectItem value="night">
                          Night (9pm - 12am)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <h2 className="text-base font-bold">Payment Information</h2>
            <div className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid gap-4 md:grid-cols-2"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="cash"
                              id="cash"
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label
                            htmlFor="cash"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Banknote className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">
                              Cash on Delivery
                            </span>
                          </Label>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="creditcard"
                              id="creditcard"
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label
                            htmlFor="creditcard"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <CreditCard className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">
                              Online Payment
                            </span>
                          </Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          className="w-full rounded-full disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </Button>
      </form>
    </Form>
  )
}

export default ClientPage
