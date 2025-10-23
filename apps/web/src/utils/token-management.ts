import { cookies } from 'next/headers';

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
  const response = await fetch(`proxy/api/auth/refresh-token`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${await getRefreshToken()}`,
    },
  });
  const data = await response.json();
  return data.data;
}
