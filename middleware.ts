import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define routes that require authentication
const protectedRoutes = [
  '/wallet',
  '/settings',
  '/alliance',
  '/vip-club',
  '/help-center',
  '/favorites',
  '/recent',
  '/hash-games',
  '/table-games',
  '/slots',
  '/live-casino',
  '/sports',
  '/futures',
  '/crypto-games',
  '/casino',
  '/promotions',
  '/game-provider',
  '/hashgames',
  '/beginner-tutorial',
  '/install-app',
  '/test'
]

// Define routes that are always public (landing page and auth pages)
const publicRoutes = [
  '/',
  '/auth',
  '/auth/google/callback'
]

// Function to check if a route is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route))
}

// Function to check if a route is public
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname === route || pathname.startsWith(route))
}

export function middleware(request: NextRequest) {
  // Temporarily disabled to fix middleware error
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
