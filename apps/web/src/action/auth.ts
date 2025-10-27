import type { UserRegisterPayload } from '@repo/validation';

import type { ApiResponse } from '@/lib/api';

import { api } from '@/lib/api';

export async function login(email: string, password: string): Promise<ApiResponse<any>> {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
}

export async function signup(data: UserRegisterPayload): Promise<ApiResponse<any>> {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
}

// logout
export async function logout(): Promise<ApiResponse<any>> {
  return api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
}
