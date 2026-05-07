import { NextRequest } from 'next/server';
import { betterAuthProxy } from '@/infrastructure/auth/better-auth/middleware';

export async function proxy(request: NextRequest) {
   return await betterAuthProxy(request);
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
   ],
};
