import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Block Server Action requests to prevent errors
  if (request.headers.get('content-type')?.includes('text/plain') && 
      request.method === 'POST' &&
      pathname.includes('_next')) {
    return new NextResponse('Server Actions disabled', { status: 404 });
  }

  // Public routes that don't require authentication
  // Explicitly allow login, register, auth, and api/auth routes
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/support')
  ) {
    const response = NextResponse.next();
    // Disable Server Actions for login page
    if (pathname.startsWith('/login')) {
      response.headers.set('x-server-actions', 'disabled');
    }
    return response;
  }

  // For all other routes, let them through and let client-side handle auth
  // This allows localStorage-based auth to work properly
  const response = NextResponse.next();
  
  // Disable prefetching for dashboard routes to prevent RSC payload errors
  if (pathname.startsWith('/dashboard')) {
    response.headers.set('x-middleware-prefetch', 'false');
  }
  
  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
