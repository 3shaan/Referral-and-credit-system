'use server';
import type { IUser } from '@repo/validation';

import { cookies } from 'next/headers';

import env from '@/env';

export async function getCurrentUser(): Promise<IUser> {
  const accessToken = (await cookies()).get('accessToken');
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/me`, { credentials: 'include', headers: { Authorization: `Bearer ${accessToken?.value}` } });
  const authUser = await res.json();
  // if (!authUser.data) {
  //   redirect('/signin');
  // }
  return authUser.data as IUser;
}
