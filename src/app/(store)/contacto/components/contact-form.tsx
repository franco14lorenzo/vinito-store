'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IS_DEV_ENVIRONMENT } from '@/constants'
import { useToast } from '@/hooks/use-toast'

import { sendContact } from '../actions'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.'
  }),
  email: z.string().email({
    message: 'Por favor, ingresa un correo electrónico válido.'
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: 'El mensaje debe tener al menos 10 caracteres.'
  })
})

const ContactForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const contact = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message
    }

    const { data, error } = await sendContact(contact)

    if (error) {
      IS_DEV_ENVIRONMENT && console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error al enviar el mensaje',
        description:
          'Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.'
      })
      setLoading(false)
      return
    }

    router.push(`/contacto/gracias?name=${data.name}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-1 rounded-lg border bg-white p-4 px-4 md:w-1/2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="123 456 7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea placeholder="Escribe tu mensaje aquí..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-10 w-full rounded-full"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
