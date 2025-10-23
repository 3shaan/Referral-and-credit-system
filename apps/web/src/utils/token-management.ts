import { cookies } from 'next/headers';

import env from '@/env';

// access token
export async function getAccessToken() {
  return (await cookies()).get('accessToken')?.value;
}

export async function setAccessToken(accessToken: string) {
  (await cookies()).set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 15 * 60, // 15 m, in nextjs its count in seconds
  });
}

// refresh token
export async function getRefreshToken() {
  return (await cookies()).get('refreshToken')?.value;
}

export async function getAccessTokenByRefreshToken() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getRefreshToken()}`,
    },
    credentials: 'include',
  });
  const data = await response.json();
  console.log(data);
  return data.data;
}
