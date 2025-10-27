'use server';
import type { IUser } from '@repo/validation';

import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<IUser> {
  const accessToken = (await cookies()).get('accessToken');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, { credentials: 'include', headers: { Authorization: `Bearer ${accessToken?.value}` } });
  const authUser = await res.json();
  // if (!authUser.data) {
  //   redirect('/signin');
  // }
  return authUser.data as IUser;
}

export async function getAllUsers(): Promise<IUser[]> {
  const cookie = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, { credentials: 'include', headers: { Authorization: `Bearer ${cookie.get('accessToken')?.value}` } });
  const users = await res.json();
  return users.data as IUser[];
}
