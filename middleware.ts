import { createClient } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabaseResponse } = createClient(request)

  // Auth session refresh is handled automatically by Supabase SSR
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
