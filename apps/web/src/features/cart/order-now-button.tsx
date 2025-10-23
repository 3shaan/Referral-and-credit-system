'use client';

import { toast } from 'sonner';

import { saveOrder } from '@/action/order';
import useAddToCart from '@/hooks/add-to-cart';

export default function OrderNowButton() {
  const { cart } = useAddToCart();

  const orderNowHandler = async () => {
    const orderItems = cart.map(item => ({
      productId: item._id,
      price: item.price,
      quantity: item.quantity,
    }));
    const res = await saveOrder({ orderItems });
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <button
      type="button"
      className="cr-button h-10 font-bold transition-all duration-300 ease-in-out py-2 px-[22px] text-[14px] font-Manrope capitalize leading-[1.2] bg-indigo-500 text-white border border-solid border-indigo-600 rounded-[5px] flex items-center justify-center hover:bg-indigo-500 hover:border-indigo-600"
      onClick={orderNowHandler}
    >
      Order Now
    </button>
  );
}
