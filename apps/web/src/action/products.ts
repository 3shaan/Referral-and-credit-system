import type { Product } from '@repo/validation';

import type { ApiResponse } from '@/lib/api';

export async function getAllProducts(): Promise<ApiResponse<Product[]>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  if (!response.ok) {
    return {
      status: response.status,
      message: 'Failed to fetch products',
      data: null,
      errors: await response.json(),
      success: false,
    };
  }
  const data = await response.json();
  return data;
}
