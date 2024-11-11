'use client'

import { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface DeliverySchedule {
  id: number
  name: string
  start_time: string
  end_time: string
  available?: boolean
}

function DeliveryInformation({
  form,
  deliverySchedules,
  accommodationName
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
  deliverySchedules: DeliverySchedule[]
  accommodationName: string
}) {
  const [availableSchedules, setAvailableSchedules] =
    useState<DeliverySchedule[]>(deliverySchedules)

  useEffect(() => {
    const selectedDate = form.watch('deliveryDate')
    const today = new Date()
    const currentTime = today.getHours() * 60 + today.getMinutes()

    const updatedSchedules = deliverySchedules.map((schedule) => {
      const [startHours, startMinutes] = schedule.start_time
        .split(':')
        .map(Number)
      const scheduleStartTime = startHours * 60 + startMinutes

      return {
        ...schedule,
        available:
          selectedDate?.toDateString() !== today?.toDateString() ||
          currentTime < scheduleStartTime
      }
    })

    setAvailableSchedules(updatedSchedules)

    const selectedTime = form.getValues('deliveryTime')
    const selectedSchedule = updatedSchedules.find(
      (schedule) => schedule.id.toString() === selectedTime
    )
    if (selectedSchedule && !selectedSchedule.available) {
      form.setValue('deliveryTime', '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('deliveryDate'), deliverySchedules])

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-bold">Información de entrega</h2>
      <article className="flex w-full flex-col gap-4 rounded border bg-white p-4 md:p-10">
        <FormField
          control={form.control}
          name="accommodation"
          render={() => (
            <FormItem>
              <FormLabel>Alojamiento</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  value={accommodationName}
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
              <FormLabel>Fecha de entrega</FormLabel>
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
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={es}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const maxDate = new Date()
                      maxDate.setDate(today.getDate() + 21)
                      maxDate.setHours(23, 59, 59, 999)
                      return date < today || date > maxDate
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horario de entrega</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un horario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableSchedules.map((schedule) => (
                    <SelectItem
                      key={schedule.id}
                      value={schedule.id.toString()}
                      disabled={!schedule.available}
                    >
                      {schedule.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription>
                Por favor, selecciona un horario de entrega con al menos 2 horas
                de antelación.
              </FormDescription>
            </FormItem>
          )}
        />
      </article>
    </section>
  )
}

export default DeliveryInformation
