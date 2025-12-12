import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/pricing', '/forgot-password', '/reset-password', '/about', '/privacy', '/terms', '/support'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Admin routes - let client-side handle authentication
  // Middleware can't access localStorage, so we allow these routes through
  // and let the client-side components check localStorage
  const isAdminRoute = pathname.startsWith('/admin');
  
  // Allow admin routes to pass through - client-side will check localStorage
  if (isAdminRoute) {
    return NextResponse.next();
  }

  // For other protected routes, we can check cookies if available
  // But since we're using localStorage, we'll let client-side handle it
  // Only redirect if it's clearly a public route
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For all other routes, let them through and let client-side handle auth
  // This allows localStorage-based auth to work properly
  return NextResponse.next();
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
