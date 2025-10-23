'use client';
import type { Product } from '@repo/validation';

import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { Activity } from 'react';

import useAddToCart from '@/hooks/add-to-cart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, cart, decreaseQuantity, increaseQuantity }

    = useAddToCart();
  const isAdded = cart.find(item => item._id === product._id);
  return (
    <>
      <Activity mode={isAdded ? 'visible' : 'hidden'}>
        <div className="">
          <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden shadow-sm  h-[35px]">
            <button
              type="button"
              onClick={() => decreaseQuantity(product._id)}
              className="w-[35px] h-[35px] flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Minus />
            </button>
            <span className="w-[35px] text-center text-gray-800 font-medium bg-white">
              {cart.find(item => item._id === product._id)?.quantity || 0}
            </span>
            <button
              type="button"
              onClick={() => increaseQuantity(product._id)}
              className="w-[35px] h-[35px] flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus />
            </button>
          </div>
        </div>
      </Activity>

      <Activity mode={isAdded ? 'hidden' : 'visible'}>
        <button
          type="button"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag className="mr-2" />
          Buy Now
        </button>
      </Activity>

    </>
  );
}
