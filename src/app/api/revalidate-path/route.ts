import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({
      revalidated: true,
      now: new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    })
  }

  return Response.json({
    revalidated: false,
    now: new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }),
    message: 'Missing path to revalidate'
  })
}
