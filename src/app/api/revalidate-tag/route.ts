import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')

  if (tag) {
    revalidateTag(tag)
    return Response.json({
      revalidated: true,
      now: new Date().toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires'
      })
    })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    timestamp: new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
    }),
    message: 'Missing tag to revalidate'
  })
}
