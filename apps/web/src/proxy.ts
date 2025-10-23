import type { NextFetchEvent, NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import {
  getAccessToken,
  getAccessTokenByRefreshToken,
  getRefreshToken,
  setAccessToken,
} from './utils/token-management';

export async function proxy(req: NextRequest, event: NextFetchEvent) {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return NextResponse.rewrite(new URL('/signin', req.url));
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    const accessTokenByRefreshToken = await getAccessTokenByRefreshToken();
    if (accessTokenByRefreshToken?.accessToken) {
      event.waitUntil(setAccessToken(accessTokenByRefreshToken.accessToken));
      // refresh the page so that new cookies can be accessable
      return NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
    } else {
      return NextResponse.rewrite(new URL('/signin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/cart'],
};
