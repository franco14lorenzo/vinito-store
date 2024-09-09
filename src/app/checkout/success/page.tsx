import { ArrowRight, CheckCircle } from 'lucide-react'

import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
export const metadata: Metadata = {
  title: 'Thank you for your purchase',
  description: 'Buy your favorite wines'
}

export default async function SuccessCheckoutPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const customerName = searchParams.name as string
  const customerEmail = searchParams.email as string

  if (!customerName || !customerEmail) {
    redirect('/checkout')
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-4 pb-56 text-center md:gap-8">
      <Card className="mx-auto flex w-full max-w-md flex-col items-center gap-2 p-4 md:p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Thank you, {customerName}!
          </CardTitle>
          <CardDescription className="text-center">
            Your order has been successfully processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <p className="text-center text-muted-foreground">
            You will receive an email confirmation shortly at{' '}
            <span className="font-semibold">{customerEmail}</span>.
          </p>
          <p className="text-center text-muted-foreground">
            If you have any questions, please contact us.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="mt-4" asChild>
            <Link href="/">
              Continue shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
