'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useRouter } from 'next/navigation'

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
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.'
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
      message: ''
    }
  })

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    const contact = {
      name: values.name,
      email: values.email,
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

    setLoading(false)

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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hola, me gustaría saber más sobre..."
                  {...field}
                />
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
