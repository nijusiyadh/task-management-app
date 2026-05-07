import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard']; // TODO: move this to constants
const AUTH_ROUTES = ['/sign-in', '/sign-up']; // TODO: move this to constants

export const betterAuthProxy = async (request: NextRequest) => {
   const { pathname } = request.nextUrl;
   const sessionCookie = getSessionCookie(request);

   const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
   );

   const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

   if (isProtected && !sessionCookie) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
   }

   if (isAuthRoute && sessionCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
   }

   return NextResponse.next();
};
