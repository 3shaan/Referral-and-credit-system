'use server';
import type { UserRegisterPayload } from '@repo/validation';

import { cookies } from 'next/headers';

import type { ApiResponse } from '@/lib/api';

import { api } from '@/lib/api';
import { setAccessToken, setRefreshToken } from '@/utils/token-management';

export async function login(email: string, password: string): Promise<ApiResponse<any>> {
  const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
  await setRefreshToken(response.data.refreshToken);
  await setAccessToken(response.data.accessToken);

  return response;
}

export async function signup(data: UserRegisterPayload): Promise<ApiResponse<any>> {
  const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
  await setAccessToken(response.data.accessToken);
  await setRefreshToken(response.data.refreshToken);

  return response;
}

// logout
export async function logout(): Promise<ApiResponse<any>> {
  const cookie = await cookies();
  const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
  cookie.delete('refreshToken');
  cookie.delete('accessToken');

  return response;
}
