import type { Product } from '@repo/validation';

import type { ApiResponse } from '@/lib/api';

import env from '@/env';

export async function getAllProducts(): Promise<ApiResponse<Product[]>> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/product`);
  const data = await response.json();
  return data;
}
