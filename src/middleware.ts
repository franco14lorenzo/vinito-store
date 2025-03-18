import { NextRequest, NextResponse } from 'next/server'

import { getAccommodationById } from './app/contexts/actions'

const PUBLIC_PATHS = ['/scan-qr']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const hasAccommodationCookie = request.cookies.has('accommodation')
  const accommodationCookie = request.cookies.get('accommodation')

  try {
    const accommodationParam =
      request.nextUrl.searchParams.get('accommodation_id')
    const response = NextResponse.next()

    if (accommodationParam === '0') {
      // Create a redirect response and then clear the cookie on that response
      const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
      const redirectResponse = NextResponse.redirect(redirectUrl.toString())
      // Delete the cookie on the redirect response
      redirectResponse.cookies.delete('accommodation')
      return redirectResponse
    }

    if (accommodationParam) {
      if (hasAccommodationCookie && accommodationCookie?.value) {
        try {
          const currentAccommodation = JSON.parse(accommodationCookie.value)
          if (currentAccommodation?.id === accommodationParam) {
            return response
          }
        } catch (error) {
          console.error('Invalid accommodation cookie format:', error)
        }
      }

      try {
        const { data } = await getAccommodationById(accommodationParam)

        if (data) {
          response.cookies.set({
            name: 'accommodation',
            value: JSON.stringify(data),
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
          })
          return response
        } else {
          const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
          const redirectResponse = NextResponse.redirect(redirectUrl.toString())
          redirectResponse.cookies.delete('accommodation')
          return redirectResponse
        }
      } catch (error) {
        console.error('Error fetching accommodation:', error)
        const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
        const redirectResponse = NextResponse.redirect(redirectUrl.toString())
        redirectResponse.cookies.delete('accommodation')
        return redirectResponse
      }
    }

    if (hasAccommodationCookie) {
      if (accommodationCookie?.value) {
        try {
          const accommodation = JSON.parse(accommodationCookie.value)
          if (accommodation?.id) {
            return response
          }
        } catch (error) {
          console.error('Invalid accommodation cookie format:', error)
        }
      }
      const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
      return NextResponse.redirect(redirectUrl.toString())
    }

    const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('Middleware error:', error)
    const redirectUrl = new URL('/scan-qr', request.nextUrl.origin)
    return NextResponse.redirect(redirectUrl.toString())
  }
}

export const config = {
  runtime: 'nodejs',
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
