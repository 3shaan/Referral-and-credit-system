'use client';
import { ShoppingBag } from 'lucide-react';

import useAddToCart from '@/hooks/add-to-cart';

export default function NavbarCart() {
  const { cart } = useAddToCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="relative">
      <ShoppingBag className="pr-[5px] text-[21px] leading-[17px]" />
      {cart.length > 0 && (
        <span className="absolute -top-2.5 -right-2.5 bg-indigo-500 text-white text-[12px] leading-3 font-Poppins font-medium rounded-full w-[18px] h-[18px] flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}
