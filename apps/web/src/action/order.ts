'use server';
import type { CreateOrder } from '@repo/validation';

import { cookies } from 'next/headers';

import type { ApiResponse } from '@/lib/api';

import env from '@/env';

export async function saveOrder(order: CreateOrder): Promise<ApiResponse<any>> {
  try {
    const accessToken = (await cookies()).get('accessToken');
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken?.value}`,
      },
      body: JSON.stringify(order),
      credentials: 'include',

    });
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    return error as unknown as ApiResponse<any>;
  }
}
