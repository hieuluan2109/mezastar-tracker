import { type NextRequest } from 'next/server'

export async function middleware(_request: NextRequest) {
  // Auth session is handled by:
  //  - Client-side: AuthContext (onAuthStateChange)
  //  - Server-side: route handlers (/auth/callback, /auth/confirm)
  // No middleware logic needed — prevents Edge Runtime errors on Vercel
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
