import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const accommodationParam =
    request.nextUrl.searchParams.get('accommodation_id')

  const cookieStore = cookies()

  if (accommodationParam) {
    return NextResponse.next()
  }

  const accommodationCookie = cookieStore.get('accommodation')

  // If the accommodation cookie is not set, redirect to /scan-qr
  if (!accommodationCookie && pathname !== '/scan-qr') {
    const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl.toString())
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
